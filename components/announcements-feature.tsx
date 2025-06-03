"use client";
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Announcement {
  id: number; // long -> number
  title: string; // text[255] -> string
  content: string; // text -> string
  created_at: string; // datetime -> string (ISO formatında olduğunu varsayalım)
  published_at: string; // datetime -> string
  expires_at?: string | null; // datetime -> string, opsiyonel
  event_id?: number | null; // long? -> number, opsiyonel
  author_id: number; // long -> number
}

// Güncellenmiş örnek duyuru verileri
const allAnnouncementsData: Announcement[] = [
  {
    id: 1,
    title: "Duyuru 1: Yeni Platform Özellikleri!",
    content: "Platformumuza kullanıcı deneyimini geliştirecek birçok yeni özellik eklendi. Detaylar için tıklayın.",
    created_at: "2025-05-10T10:00:00Z",
    published_at: "2025-05-15T09:00:00Z",
    expires_at: null, // Süresiz
    author_id: 101,
  },
  {
    id: 2,
    title: "Duyuru 2: Planlı Sistem Bakımı",
    content: "18 Mayıs Pazar günü 02:00 - 04:00 saatleri arasında sistemlerimizde planlı bakım çalışması yapılacaktır.",
    created_at: "2025-05-14T14:00:00Z",
    published_at: "2025-05-16T10:00:00Z",
    expires_at: "2025-05-19T00:00:00Z", // Bakım sonrası geçerliliğini yitirir
    author_id: 102,
  },
  {
    id: 3,
    title: "Duyuru 3: Yaz Sezonu Kampanyaları Başladı!",
    content: "Tüm ürünlerimizde geçerli %40'a varan indirimlerle yaz kampanyalarımız başladı. Fırsatları kaçırmayın!",
    created_at: "2025-05-17T08:00:00Z",
    published_at: "2025-05-17T11:00:00Z",
    expires_at: "2025-06-30T23:59:59Z",
    author_id: 101,
    event_id: 5001,
  },
  {
    id: 4,
    title: "Duyuru 4: Gelecek Hafta Webinar: AI ve Gelecek",
    content: "Yapay zeka teknolojilerinin geleceğini tartışacağımız özel webinarımıza davetlisiniz. Kayıt için son günleri kaçırmayın.",
    created_at: "2025-05-18T09:00:00Z", // Bugün oluşturuldu (simülasyon)
    published_at: "2025-05-18T12:00:00Z", // Bugün yayınlanacak (simülasyon)
    expires_at: "2025-05-25T23:59:59Z",
    author_id: 103,
  },
  {
    id: 5,
    title: "Duyuru 5: Mobil Uygulama Güncellemesi",
    content: "Mobil uygulamamız yeni arayüzü ve performans iyileştirmeleriyle güncellendi. Hemen indirin!",
    created_at: "2025-05-12T16:00:00Z",
    published_at: "2025-05-19T09:00:00Z", // Gelecekte yayınlanacak
    expires_at: null,
    author_id: 102,
  },
  {
    id: 6,
    title: "Duyuru 6: Önemli Güvenlik Güncellemesi",
    content: "Tüm kullanıcılarımızın hesap güvenliği için önemli bir güncelleme yayınladık. Lütfen şifrelerinizi güncelleyin.",
    created_at: "2025-04-20T10:00:00Z",
    published_at: "2025-04-25T09:00:00Z", // Yayınlanmış
    expires_at: null, // Süresiz
    author_id: 101,
  },
  {
    id: 7,
    title: "Duyuru 7: Müşteri Geri Bildirim Anketi",
    content: "Hizmet kalitemizi artırmak için değerli geri bildirimlerinize ihtiyacımız var. Lütfen kısa anketimize katılın.",
    created_at: "2025-05-01T11:00:00Z",
    published_at: "2025-05-05T10:00:00Z", // Yayınlanmış
    expires_at: "2025-05-17T23:59:59Z", // Dün süresi dolmuş (simülasyon)
    author_id: 103,
  },
  {
    id: 8,
    title: "Duyuru 8: Yeni Ofisimiz Açıldı!",
    content: "Büyüyen ekibimize daha iyi hizmet verebilmek için yeni ofisimizin açılışını duyurmaktan mutluluk duyarız.",
    created_at: "2025-05-20T09:00:00Z", // Gelecekte oluşturulacak (test amaçlı)
    published_at: "2025-05-22T10:00:00Z", // Gelecekte yayınlanacak
    expires_at: null,
    author_id: 101,
  },
];

export default function AnnouncementsFeature() {
  const [activeAnnouncements, setActiveAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const announcementsToShow = 3;

  useEffect(() => {
    const now = new Date(); // Filtreleme için şu anki zaman

    // Veriyi filtrele ve sırala
    // Gerçek uygulamada `allAnnouncementsData` prop olarak gelebilir.
    const filteredAndSortedAnnouncements = allAnnouncementsData
      .filter(announcement => {
        const publishedAtDate = new Date(announcement.published_at);
        const expiresAtDate = announcement.expires_at ? new Date(announcement.expires_at) : null;

        const isPublished = publishedAtDate <= now;
        const isNotExpired = !expiresAtDate || expiresAtDate > now;

        return isPublished && isNotExpired;
      })
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()); // En yeni yayınlanana göre sırala

    setActiveAnnouncements(filteredAndSortedAnnouncements);
    setCurrentIndex(0); // Her zaman filtrelenmiş listenin başından başla
  }, []); // Boş bağımlılık dizisi, bu effect'in sadece bileşen mount edildiğinde çalışmasını sağlar.

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    const maxPossibleStartingIndex = activeAnnouncements.length - announcementsToShow;
    setCurrentIndex((prevIndex) => Math.min(maxPossibleStartingIndex, prevIndex + 1));
  };

  const visibleAnnouncements = activeAnnouncements.slice(currentIndex, currentIndex + announcementsToShow);

  if (activeAnnouncements.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Son Duyurular</h2>
        <p className="text-gray-600">Görüntülenecek aktif duyuru bulunmamaktadır.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-700 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Son Duyurular</h2>
        {activeAnnouncements.length > announcementsToShow && (
          <div className="flex space-x-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Önceki duyurular"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= activeAnnouncements.length - announcementsToShow || visibleAnnouncements.length < announcementsToShow && currentIndex === activeAnnouncements.length - announcementsToShow}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Sonraki duyurular"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>

      {visibleAnnouncements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleAnnouncements.map((announcement) => (
            <div key={announcement.id} onClick={() => window.location.href = 'https://localhost:3000/event/1'} className="p-5 border border-gray-200 rounded-xl bg-slate-50 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2 truncate" title={announcement.title}>
                {announcement.title}
              </h3>
              <p className="text-xs text-gray-500 mb-1">
                Yayın: {new Date(announcement.published_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              {announcement.expires_at && (
                <p className="text-xs text-gray-500 mb-3">
                  Geçerli: {new Date(announcement.expires_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              )}
              <p className="text-gray-700 text-sm mt-2 line-clamp-4 flex-grow">{announcement.content}</p>
              {/* <p className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-200">Yazar ID: {announcement.author_id}</p> */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Bu aralıkta gösterilecek duyuru bulunmamaktadır.</p>
      )}

      {activeAnnouncements.length > announcementsToShow && (
        <div className="text-center mt-6 text-sm text-gray-500">
          {`${Math.min(currentIndex + 1, activeAnnouncements.length)} - ${Math.min(currentIndex + visibleAnnouncements.length, activeAnnouncements.length)} / ${activeAnnouncements.length} duyuru`}
        </div>
      )}
    </div>
  );
}
