// ====== Mock data khách sạn (demo) ======
const HOTELS = [
  {
    id: "h1",
    name: "Gold Central Hotel by Haviland",
    city: "Đà Nẵng",
    area: "Hòa Thuận Đông, Quận Hải Châu",
    stars: 3,
    rating: 8.5,
    reviews: 854,
    price: 454271,
    oldPrice: 605695,
    popular: 92,
    breakfast: true,
    freeCancel: true,
    img: "https://picsum.photos/seed/hotel1/900/600"
  },
  {
    id: "h2",
    name: "Seaside Boutique Hotel",
    city: "Đà Nẵng",
    area: "Mỹ An, Ngũ Hành Sơn",
    stars: 4,
    rating: 8.9,
    reviews: 1203,
    price: 689000,
    oldPrice: 820000,
    popular: 95,
    breakfast: true,
    freeCancel: false,
    img: "https://picsum.photos/seed/hotel2/900/600"
  },
  {
    id: "h3",
    name: "Riverside Stay & Spa",
    city: "Đà Nẵng",
    area: "An Hải, Sơn Trà",
    stars: 5,
    rating: 9.1,
    reviews: 642,
    price: 1299000,
    oldPrice: 1499000,
    popular: 90,
    breakfast: true,
    freeCancel: true,
    img: "https://picsum.photos/seed/hotel3/900/600"
  },
  {
    id: "h4",
    name: "Budget Inn Center",
    city: "Đà Nẵng",
    area: "Thanh Khê, Đà Nẵng",
    stars: 2,
    rating: 7.9,
    reviews: 311,
    price: 299000,
    oldPrice: 399000,
    popular: 78,
    breakfast: false,
    freeCancel: true,
    img: "https://picsum.photos/seed/hotel4/900/600"
  },
  {
    id: "h5",
    name: "Skyline Hotel & Apartment",
    city: "Đà Nẵng",
    area: "Hải Châu, Đà Nẵng",
    stars: 4,
    rating: 8.2,
    reviews: 520,
    price: 559000,
    oldPrice: 699000,
    popular: 85,
    breakfast: false,
    freeCancel: false,
    img: "https://picsum.photos/seed/hotel5/900/600"
  }
];

// ====== Helpers ======
const VND = (n) => new Intl.NumberFormat("vi-VN").format(n) + " VND";
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function nightsBetween(from, to){
  const a = new Date(from);
  const b = new Date(to);
  const ms = b - a;
  if (Number.isNaN(ms)) return 1;
  const nights = Math.round(ms / (1000 * 60 * 60 * 24));
  return Math.max(1, nights);
}

// ====== State ======
const state = {
  city: "Đà Nẵng",
  from: "",
  to: "",
  adult: 2,
  child: 0,
  room: 1,
  minPrice: 0,
  maxPrice: 5000000,
  breakfast: false,
  freeCancel: false,
  topRating: false,
  sortBy: "popular",
  view: "list"
};

// ====== DOM ======
const qCity = document.getElementById("qCity");
const qFrom = document.getElementById("qFrom");
const qTo = document.getElementById("qTo");
const nightHint = document.getElementById("nightHint");

const guestBtn = document.getElementById("guestBtn");
const guestPanel = document.getElementById("guestPanel");
const guestText = document.getElementById("guestText");
const adultVal = document.getElementById("adultVal");
const childVal = document.getElementById("childVal");
const roomVal = document.getElementById("roomVal");
const guestApply = document.getElementById("guestApply");

const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const minLabel = document.getElementById("minLabel");
const maxLabel = document.getElementById("maxLabel");
const resetPrice = document.getElementById("resetPrice");

const fBreakfast = document.getElementById("fBreakfast");
const fFreeCancel = document.getElementById("fFreeCancel");
const fTopRating = document.getElementById("fTopRating");

const sortBy = document.getElementById("sortBy");
const viewList = document.getElementById("viewList");
const viewGrid = document.getElementById("viewGrid");

const resultTitle = document.getElementById("resultTitle");
const countFound = document.getElementById("countFound");
const hotelList = document.getElementById("hotelList");

const searchBtn = document.getElementById("searchBtn");

// Modal
const modal = document.getElementById("modal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

// ====== Init dates ======
(function initDates(){
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const dayAfter = new Date(now);
  dayAfter.setDate(now.getDate() + 2);

  const iso = (d) => d.toISOString().slice(0,10);
  qFrom.value = iso(tomorrow);
  qTo.value = iso(dayAfter);

  state.from = qFrom.value;
  state.to = qTo.value;
  updateNightHint();
})();

// ====== UI updates ======
function updateGuestText(){
  guestText.textContent = `${state.adult} người lớn, ${state.child} trẻ em, ${state.room} phòng`;
  adultVal.textContent = state.adult;
  childVal.textContent = state.child;
  roomVal.textContent = state.room;
}

function updateNightHint(){
  const n = nightsBetween(qFrom.value, qTo.value);
  nightHint.textContent = `Thời gian: ${n} đêm`;
}

function syncPriceLabels(){
  minLabel.textContent = VND(state.minPrice);
  maxLabel.textContent = VND(state.maxPrice);
}

// ====== Filtering & sorting ======
function applyFilters(){
  const city = state.city.trim().toLowerCase();

  let items = HOTELS.filter(h => h.city.toLowerCase().includes(city));

  items = items.filter(h => h.price >= state.minPrice && h.price <= state.maxPrice);

  if (state.breakfast) items = items.filter(h => h.breakfast);
  if (state.freeCancel) items = items.filter(h => h.freeCancel);
  if (state.topRating) items = items.filter(h => h.rating >= 8.0);

  items = sortItems(items);
  return items;
}

function sortItems(items){
  const s = state.sortBy;
  const arr = [...items];

  if (s === "popular") arr.sort((a,b) => b.popular - a.popular);
  if (s === "priceAsc") arr.sort((a,b) => a.price - b.price);
  if (s === "priceDesc") arr.sort((a,b) => b.price - a.price);
  if (s === "ratingDesc") arr.sort((a,b) => b.rating - a.rating);

  return arr;
}

// ====== Render ======
function starText(n){
  return "★".repeat(n) + "☆".repeat(Math.max(0, 5-n));
}

function render(){
  state.city = qCity.value || "Đà Nẵng";
  resultTitle.textContent = state.city;

  const items = applyFilters();
  countFound.textContent = items.length;

  hotelList.classList.toggle("list--list", state.view === "list");
  hotelList.classList.toggle("list--grid", state.view === "grid");

  hotelList.innerHTML = items.map(h => `
    <article class="hotel">
      <div class="hotel__media">
        <img src="${h.img}" alt="${h.name}">
        <div class="badge">Khách sạn</div>
      </div>

      <div class="hotel__info">
        <h3 class="hotel__name">${h.name}</h3>
        <div class="meta">
          <span class="stars">${starText(h.stars)}</span>
          <span>•</span>
          <span>📍 ${h.area}</span>
        </div>

        <div class="tags">
          ${h.breakfast ? `<span class="tag">Bữa sáng</span>` : `<span class="tag gray">Không bữa sáng</span>`}
          ${h.freeCancel ? `<span class="tag">Miễn phí hủy</span>` : `<span class="tag gray">Không hoàn hủy</span>`}
          <span class="tag gray">Phổ biến: ${h.popular}%</span>
        </div>
      </div>

      <div class="hotel__buy">
        <div class="score">
          <div>
            <div class="n">${h.rating.toFixed(1)}/10</div>
            <div class="c">(${h.reviews} đánh giá)</div>
          </div>
          <div class="t">${h.rating >= 8.5 ? "Rất tốt" : h.rating >= 8.0 ? "Tốt" : "Ổn"}</div>
        </div>

        <div class="pricebox">
          <div class="oldprice">${VND(h.oldPrice)}</div>
          <div class="price">${VND(h.price)}</div>
          <div class="per">mỗi phòng / mỗi đêm</div>
        </div>

        <div class="buyrow">
          <button class="btn btn--orange" data-pick="${h.id}" type="button">Chọn phòng</button>
        </div>
      </div>
    </article>
  `).join("");

  // gắn sự kiện nút "Chọn phòng"
  document.querySelectorAll("[data-pick]").forEach(btn => {
    btn.addEventListener("click", () => openRoomModal(btn.dataset.pick));
  });
}

// ====== Modal logic ======
function openRoomModal(hotelId){
  const h = HOTELS.find(x => x.id === hotelId);
  if(!h) return;

  modalTitle.textContent = `Chọn phòng - ${h.name}`;

  const n = nightsBetween(qFrom.value, qTo.value);
  const total = h.price * n;

  modalBody.innerHTML = `
    <p><b>Điểm đến:</b> ${state.city}</p>
    <p><b>Ngày:</b> ${qFrom.value} → ${qTo.value} (<b>${n}</b> đêm)</p>
    <p><b>Khách & phòng:</b> ${state.adult} NL, ${state.child} TE, ${state.room} phòng</p>
    <hr/>
    <p><b>Giá/đêm:</b> ${VND(h.price)}</p>
    <p><b>Tổng tiền (ước tính):</b> <span style="font-weight:900">${VND(total)}</span></p>
    <p style="color:#64748b;margin:0">* Demo: chưa tích hợp thanh toán / API thật.</p>
  `;

  modal.classList.remove("hidden");

  modalOk.onclick = () => {
    alert(`Đặt phòng thành công (demo)!\n${h.name}\nTổng: ${VND(total)}`);
    closeModal();
  };
}

function closeModal(){
  modal.classList.add("hidden");
}
modalOverlay.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

// ====== Guest dropdown ======
guestBtn.addEventListener("click", () => {
  guestPanel.classList.toggle("hidden");
});
guestApply.addEventListener("click", () => {
  guestPanel.classList.add("hidden");
  updateGuestText();
});

document.addEventListener("click", (e) => {
  const inside = guestPanel.contains(e.target) || guestBtn.contains(e.target);
  if(!inside) guestPanel.classList.add("hidden");
});

document.querySelectorAll(".step").forEach(b => {
  b.addEventListener("click", () => {
    const key = b.dataset.step;
    const dir = b.dataset.dir;

    if(key === "adult"){
      state.adult = clamp(state.adult + (dir === "+" ? 1 : -1), 1, 20);
    }
    if(key === "child"){
      state.child = clamp(state.child + (dir === "+" ? 1 : -1), 0, 20);
    }
    if(key === "room"){
      state.room = clamp(state.room + (dir === "+" ? 1 : -1), 1, 10);
    }
    updateGuestText();
  });
});

// ====== Date changes ======
qFrom.addEventListener("change", () => {
  state.from = qFrom.value;
  // nếu ngày đi >= ngày về => auto +1
  if (qTo.value && qFrom.value >= qTo.value) {
    const d = new Date(qFrom.value);
    d.setDate(d.getDate() + 1);
    qTo.value = d.toISOString().slice(0,10);
  }
  updateNightHint();
  render();
});

qTo.addEventListener("change", () => {
  state.to = qTo.value;
  if (qFrom.value && qFrom.value >= qTo.value) {
    const d = new Date(qTo.value);
    d.setDate(d.getDate() - 1);
    qFrom.value = d.toISOString().slice(0,10);
  }
  updateNightHint();
  render();
});

// ====== Price range ======
function normalizeRanges(){
  let a = Number(minPrice.value);
  let b = Number(maxPrice.value);
  if (a > b) [a, b] = [b, a];
  state.minPrice = a;
  state.maxPrice = b;
  syncPriceLabels();
  render();
}
minPrice.addEventListener("input", normalizeRanges);
maxPrice.addEventListener("input", normalizeRanges);

resetPrice.addEventListener("click", () => {
  minPrice.value = 0;
  maxPrice.value = 5000000;
  normalizeRanges();
});

// ====== Filters ======
fBreakfast.addEventListener("change", () => { state.breakfast = fBreakfast.checked; render(); });
fFreeCancel.addEventListener("change", () => { state.freeCancel = fFreeCancel.checked; render(); });
fTopRating.addEventListener("change", () => { state.topRating = fTopRating.checked; render(); });

// ====== Sort & view ======
sortBy.addEventListener("change", () => { state.sortBy = sortBy.value; render(); });

viewList.addEventListener("click", () => {
  state.view = "list";
  viewList.classList.add("vt--active");
  viewGrid.classList.remove("vt--active");
  render();
});
viewGrid.addEventListener("click", () => {
  state.view = "grid";
  viewGrid.classList.add("vt--active");
  viewList.classList.remove("vt--active");
  render();
});

// ====== Search ======
searchBtn.addEventListener("click", () => {
  state.city = qCity.value || "Đà Nẵng";
  render();
});

// init
updateGuestText();
syncPriceLabels();
render();
