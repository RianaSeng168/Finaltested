import axios from "axios";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export const api = axios.create({
  baseURL: `${STRAPI_URL}/api`,
});

// Attach the JWT (if we have one) to every outgoing request.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ============================================================
   AUTH  — Strapi's built-in Users & Permissions plugin
   ============================================================ */

// Register a new user. Strapi returns { jwt, user }.
export async function registerUser({ username, email, password }) {
  const res = await api.post("/auth/local/register", {
    username,
    email,
    password,
  });
  return res.data; // { jwt, user }
}

// Login with email or username. Strapi returns { jwt, user }.
export async function loginUser({ identifier, password }) {
  const res = await api.post("/auth/local", { identifier, password });
  return res.data; // { jwt, user }
}

// Kick off the "forgot password" email flow.
export async function forgotPassword(email) {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
}

// Complete the reset using the `code` from the email link + new password.
export async function resetPassword({ code, password, passwordConfirmation }) {
  const res = await api.post("/auth/reset-password", {
    code,
    password,
    passwordConfirmation,
  });
  return res.data; // { jwt, user }
}

// Fetch the currently-logged-in user (validates the stored JWT).
export async function fetchMe() {
  const res = await api.get("/users/me?populate=role");
  return res.data;
}

/* ============================================================
   ROOMS  — the "product / service" content-type (CRUD)
   Strapi v4 response shape: { data: [{ id, attributes: {...} }] }
   ============================================================ */

function flattenRoom(entry) {
  return { id: entry.id, ...entry.attributes };
}

export async function getRooms() {
  const res = await api.get("/rooms?sort=createdAt:desc");
  return res.data.data.map(flattenRoom);
}

export async function getRoom(id) {
  const res = await api.get(`/rooms/${id}`);
  return flattenRoom(res.data.data);
}

export async function createRoom(payload) {
  const res = await api.post("/rooms", { data: payload });
  return flattenRoom(res.data.data);
}

export async function updateRoom(id, payload) {
  const res = await api.put(`/rooms/${id}`, { data: payload });
  return flattenRoom(res.data.data);
}

export async function deleteRoom(id) {
  await api.delete(`/rooms/${id}`);
  return id;
}

export default api;
