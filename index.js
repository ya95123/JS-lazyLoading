const lazyImages = document.querySelectorAll("[data-src]")

// *載入圖片的 function
const loadImages = (img) => {
  // 取得 data-src 的值，這裡的 img 會在觀察值裡傳進來，為 DOM 本身
  const src = img.getAttribute("data-src")
  if (!src) return

  // 將 DOM 的 src 載入圖片連結
  img.src = src
}

// options
const lazyOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0
}

// callback
const lazyCallback = (entries, observer) => {
  entries.forEach((entry, idx) => {
    if (!entry.isIntersecting) return

    // 載入圖片，調用 loadImages function
    loadImages(entry.target)
    console.log(`為第 ${idx + 1} 張加載中`)
    // 載入後就停止觀察。提升效能
    observer.unobserve(entry.target)
  })
}

// create Intersecting Observer
const lazyObserver = new IntersectionObserver(lazyCallback, lazyOptions)

// observe images
lazyImages.forEach(img => lazyObserver.observe(img))