// offline-db.js
// Real offline persistence layer using IndexedDB
// No network, no SW, no sync logic here

const DB_NAME = "kingsvillagefit-offline-db";
const DB_VERSION = 1;
const STORE_NAME = "pending"; // queue for offline saves

let dbPromise = null;

export function initOfflineDB() {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true
        });

        store.createIndex("type", "type", { unique: false });
        store.createIndex("createdAt", "createdAt", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return dbPromise;
}

/**
 * Save offline item
 * @param {Object} data
 * @param {"route"|"training"} type
 */
export async function addOfflineItem(data, type) {
  const db = await initOfflineDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const payload = {
      type,
      data,
      createdAt: Date.now()
    };

    const req = store.add(payload);

    req.onsuccess = () => resolve(payload);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Get all offline items
 */
export async function getAllOfflineItems() {
  const db = await initOfflineDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    const req = store.getAll();

    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Remove offline item by id
 */
export async function removeOfflineItem(id) {
  const db = await initOfflineDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const req = store.delete(id);

    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}

/**
 * Clear all offline data (debug/dev tool)
 */
export async function clearOfflineDB() {
  const db = await initOfflineDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    const req = store.clear();

    req.onsuccess = () => resolve(true);
    req.onerror = () => reject(req.error);
  });
}
