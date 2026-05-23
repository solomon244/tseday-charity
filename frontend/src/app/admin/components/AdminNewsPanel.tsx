"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, Loader2, Plus, Search, Trash2 } from "lucide-react";
import type { NewsArticleRecord } from "@/lib/adminTypes";
import { AdminAlerts } from "./AdminAlerts";
import { AdminPagination } from "./AdminPagination";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { adminJson } from "./adminUtils";

const EMPTY_FORM = {
  slug: "",
  title: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Program Update",
  tags: "",
  imageEmoji: "📰",
  body: "",
  published: true,
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function AdminNewsPanel() {
  const router = useRouter();
  const [rows, setRows] = useState<NewsArticleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({
      q: query,
      page: String(page),
      pageSize: String(pageSize),
    });
    const { data, error: err, status } = await adminJson<{ items: NewsArticleRecord[]; total: number }>(
      `/api/admin/news?${params}`,
    );
    if (status === 401) {
      router.refresh();
      return;
    }
    if (err || !data) {
      setError(err ?? "Could not load news articles.");
      setLoading(false);
      return;
    }
    setRows(data.items);
    setTotal(data.total);
    setLoading(false);
  }, [page, pageSize, query, router]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
    setNotice(null);
  }

  function openEdit(article: NewsArticleRecord) {
    setEditingId(article.id);
    setForm({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      category: article.category,
      tags: article.tags.join(", "),
      imageEmoji: article.imageEmoji,
      body: article.body.join("\n\n"),
      published: article.published,
    });
    setShowForm(true);
    setNotice(null);
  }

  async function saveArticle(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      body: form.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
    };
    const { error: err, status } = await adminJson<{ article: NewsArticleRecord }>(
      editingId ? "/api/admin/news" : "/api/admin/news",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
      },
    );
    if (status === 401) router.refresh();
    else if (err) setError(err);
    else {
      setNotice(editingId ? "Article updated." : "Article published.");
      setShowForm(false);
      setEditingId(null);
      await load();
    }
    setSaving(false);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    setError(null);
    const { error: err, status } = await adminJson(`/api/admin/news?id=${encodeURIComponent(deleteTarget.id)}`, {
      method: "DELETE",
    });
    setDeleting(false);
    if (status === 401) router.refresh();
    else if (err) setError(err);
    else {
      setDeleteTarget(null);
      setNotice("Article deleted.");
      await load();
    }
  }

  return (
    <div className="space-y-4">
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => !open && !deleting && setDeleteTarget(null)}
        title="Delete this article?"
        description="This will permanently remove the article from the public News & Updates page. This action cannot be undone."
        highlight={deleteTarget?.title}
        confirmLabel="Delete article"
        loading={deleting}
        onConfirm={confirmDelete}
      />

      <AdminAlerts notice={notice} error={error} />

      <div className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-soft dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-end sm:justify-between">
        <label className="flex-1">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-500">Search</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              placeholder="Title, category, or slug"
              className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm dark:border-gray-700 dark:bg-gray-950"
            />
          </div>
        </label>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-tsedey-navy px-4 py-2 text-sm font-semibold text-white hover:bg-tsedey-blue dark:bg-tsedey-blue"
        >
          <Plus className="h-4 w-4" />
          New article
        </button>
      </div>

      {showForm ? (
        <form
          onSubmit={(e) => void saveArticle(e)}
          className="space-y-4 rounded-2xl border border-tsedey-cyan/30 bg-white p-5 shadow-soft dark:border-tsedey-cyan/20 dark:bg-gray-900"
        >
          <h3 className="font-heading text-lg font-bold text-tsedey-navy dark:text-white">
            {editingId ? "Edit article" : "New article"}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="mb-1 block text-xs font-semibold text-gray-500">Title</span>
              <input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: f.slug || slugify(e.target.value),
                  }))
                }
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
              />
            </label>
            <label>
              <span className="mb-1 block text-xs font-semibold text-gray-500">Slug</span>
              <input
                required
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
              />
            </label>
            <label>
              <span className="mb-1 block text-xs font-semibold text-gray-500">Date</span>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
              />
            </label>
            <label>
              <span className="mb-1 block text-xs font-semibold text-gray-500">Category</span>
              <input
                required
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
              />
            </label>
            <label>
              <span className="mb-1 block text-xs font-semibold text-gray-500">Emoji</span>
              <input
                value={form.imageEmoji}
                onChange={(e) => setForm((f) => ({ ...f, imageEmoji: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
              />
            </label>
            <label className="md:col-span-2">
              <span className="mb-1 block text-xs font-semibold text-gray-500">Tags (comma-separated)</span>
              <input
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
              />
            </label>
            <label className="md:col-span-2">
              <span className="mb-1 block text-xs font-semibold text-gray-500">Excerpt</span>
              <textarea
                required
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
              />
            </label>
            <label className="md:col-span-2">
              <span className="mb-1 block text-xs font-semibold text-gray-500">Body (paragraphs separated by blank lines)</span>
              <textarea
                required
                rows={6}
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-950"
              />
            </label>
            <label className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Published on site</span>
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-tsedey-navy px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : editingId ? "Save changes" : "Create article"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold dark:border-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading...
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
          No articles yet. Create your first news post.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900">
            <table className="min-w-full divide-y divide-gray-100 text-sm dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-950/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Article</th>
                  <th className="px-4 py-3 text-left font-semibold">Date</th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-2">
                        <span className="text-lg" aria-hidden>
                          {r.imageEmoji}
                        </span>
                        <div>
                          <p className="font-semibold text-tsedey-navy dark:text-white">{r.title}</p>
                          <p className="text-xs text-gray-500">{r.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">{r.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          r.published
                            ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {r.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <a
                          href={`/news/${r.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                          aria-label="View on site"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => openEdit(r)}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget({ id: r.id, title: r.title })}
                          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40"
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AdminPagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={(s) => {
              setPageSize(s);
              setPage(1);
            }}
          />
        </>
      )}
    </div>
  );
}
