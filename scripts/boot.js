import { sleep } from "./util.js";

export async function boot() {
  document.body.addEventListener("click", cont);

  await sleep(1500);
  document.getElementById("boot-hint").classList.add("boot-flashing");
}

async function cont() {
  const overlay = document.getElementById("overlay");
  const boot = document.getElementById("boot");
  const menu = document.getElementById("menu");

  let startup = new Audio("../sounds/startup.mp3");
  let menuloop = new Audio("../sounds/menusong.mp3");
  let click = new Audio("../sounds/bootclick.mp3");

  menuloop.loop = true;

  overlay.classList.remove("boot-fadeout");
  overlay.classList.add("boot-fadein");

  click.play();

  document.body.removeEventListener("click", cont);

  overlay.addEventListener("animationend", async (event) => {
    if (event.animationName != "fadein") {
      return;
    }
    boot.classList.add("hidden");
    menu.classList.remove("hidden");

    await sleep(1500);
    startup.play();
    menuloop.play();
    overlay.classList.remove("boot-fadein");
    overlay.classList.add("boot-fadeout");
  });
}
