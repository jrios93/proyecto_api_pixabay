import { ref } from "vue";

export function usePixabayImages() {
  const imageList = ref([]);
  const err = ref(null);
  const total = ref(0);
  const totalPages = ref(0);
  const perPage = ref(50);
  const isLoading = ref(false);

  const fetchData = async (searchInput = "", page = 1) => {
    isLoading.value = true;
    err.value = null;
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=49140853-c4a00e3a110ecdb4330de34d2&q=${searchInput}&image_type=photo&pretty=true&page=${page}&per_page=${perPage.value}`
      );
      if (!response.ok) {
        err.value = "Error en llamar la data";
      }
      const data = await response.json();
      imageList.value = data.hits;
      total.value = data.totalHits;
      totalPages.value = Math.ceil(total.value / perPage.value);
    } catch (error) {
      err.value = error.message;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    imageList,
    err,
    total,
    totalPages,
    perPage,
    isLoading,
    fetchData,
  };
}
