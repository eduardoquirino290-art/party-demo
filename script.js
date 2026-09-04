const RSVP_KEY = "party_demo_rsvps";


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {
  const menu = document.getElementById("navMenu");

  if (menu) {
    menu.classList.toggle("open");
  }
}


/* =========================
   COUNTDOWN
========================= */

function countdown() {

  const target = new Date(
    "May 15, 2027 14:00:00"
  ).getTime();

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (!days) return;

  function update() {

    const now = Date.now();
    const difference = Math.max(0, target - now);

    const d = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const h = Math.floor(
      difference / (1000 * 60 * 60) % 24
    );

    const m = Math.floor(
      difference / (1000 * 60) % 60
    );

    const s = Math.floor(
      difference / 1000 % 60
    );

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");
  }

  update();

  setInterval(update, 1000);
}


/* =========================
   RSVP
========================= */

function getRsvps() {

  try {

    return JSON.parse(
      localStorage.getItem(RSVP_KEY)
    ) || [];

  } catch {

    return [];

  }
}


function saveRsvps(data) {

  localStorage.setItem(
    RSVP_KEY,
    JSON.stringify(data)
  );

}


function setupRSVP() {

  const form = document.getElementById("rsvpForm");

  if (!form) return;

  const attendance =
    document.getElementById("attendance");

  const guestContainer =
    document.getElementById("guestCountContainer");

  const guestCount =
    document.getElementById("guestCount");

  const message =
    document.getElementById("rsvpMessage");


  attendance.addEventListener("change", function() {

    if (attendance.value === "yes") {

      guestContainer.classList.remove("hidden");

      guestCount.required = true;

    } else {

      guestContainer.classList.add("hidden");

      guestCount.required = false;

    }

  });


  form.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
      document.getElementById("guestName")
      .value
      .trim();

    const record = {

      id: Date.now(),

      name: name,

      attendance:
        attendance.value,

      guests:
        attendance.value === "yes"
          ? Number(guestCount.value || 1)
          : 0,

      pup:
        document.getElementById("favoritePup")
        .value,

      notes:
        document.getElementById("notes")
        .value
        .trim(),

      submitted:
        new Date().toISOString()

    };


    let rsvps = getRsvps();


    /* Prevent duplicate names */

    rsvps = rsvps.filter(function(rsvp) {

      return rsvp.name.toLowerCase()
        !== name.toLowerCase();

    });


    rsvps.push(record);

    saveRsvps(rsvps);


    form.reset();

    guestContainer.classList.add("hidden");

    guestCount.required = false;


    message.textContent =
      "✓ RSVP received! Thanks for joining the mission.";

    message.style.color = "#168246";

  });

}


/* =========================
   START
========================= */

countdown();

setupRSVP();
