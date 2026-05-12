const SERVER = "https://milexinteam.github.io/Denali-package-repo/denali.db.tar.gz";

async function loadRepo() {
  try {
    const res = await fetch(SERVER);

    if (!res.ok) {
      throw new Error("Fetch failed");
    }

    const gz = new Uint8Array(await res.arrayBuffer());

    // rozpakuj gzip → tar
    const tarData = fflate.decompressSync(gz);

    BrowserFS.configure({
      fs: "TarFS",
      options: {
        data: tarData.buffer
      }
    }, () => {
      const fs = BrowserFS.BFSRequire("fs");
      console.log(fs.readdirSync("/"));
    });

  } catch (err) {
    console.error("Błąd:", err);

    // pokaż komunikat błędu
    const errorEl = document.querySelector(".error");
    if (errorEl) errorEl.classList.remove("hide");
  }
}

loadRepo();
