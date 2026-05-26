import { addOfflineItem, getAllOfflineItems, removeOfflineItem } from './offline-db.js';

/**
 * Save item online or fallback to offline DB
 * @param {string} url - endpoint (/api/routes ili /api/trainings)
 * @param {Object} payload - data to save
 * @param {"route"|"training"} type
 */
export async function safeSave(url, payload, type) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Server error");

    console.log("✅ Saved online:", type);
    return { status: "online" };

  } catch (err) {
    console.log("📴 Offline → saving to queue:", type);

    await addOfflineItem(payload, type);

    return { status: "offline" };
  }
}
