export async function apiData(query, page) {
  try {
    const result = await fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=32397953-af46d34d58be89ead8094befd&image_type=photo&orientation=horizontal&per_page=12`
    );
    return await result.json();
  } catch (error) {
    console.error(error);
  }
}
