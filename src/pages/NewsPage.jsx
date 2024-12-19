import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../redux/slice";
import { createSelector } from "reselect";

// Selector untuk mengambil data global
const selectGlobalData = (state) => state.globalData;

export const selectCountries = createSelector(
  [selectGlobalData],
  (globalData) => globalData.countries
);

function NewsPage() {
  const dispatch = useDispatch();

  // Mengambil state dari Redux store
  const { news, isLoading, error } = useSelector((state) => ({
    news: state.globalData.news,
    isLoading: state.globalData.isLoading.news,
    error: state.globalData.error.news,
  }));

  // Memanggil fetchNews saat komponen dimuat
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "10px" }}>
      {/* Menampilkan spinner saat loading */}
      {isLoading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Menampilkan pesan error jika ada */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Menampilkan daftar artikel berita */}
      {Array.isArray(news) &&
        news.map((article) => (
          <div
            key={article.url} // Menggunakan URL sebagai key unik
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #ddd",
              padding: "10px 0",
            }}
          >
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              {article.title || "No Title"}
            </h3>
            <p style={{ color: "#555" }}>
              {article.description || "No description available."}
            </p>
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  marginBottom: "10px",
                }}
              />
            )}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Read More
            </a>
          </div>
        ))}
    </div>
  );
}

export default NewsPage;