import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: AlloCiné", function () {
    it("should return URL when it's not a video", async function () {
        const url = new URL("https://www.allocine.fr/video/");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file, url.href);
    });

    it("should return standard video URL", async function () {
        const url = new URL("https://www.allocine.fr/video/video-19577157/");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "https://fr.vid.web.acsta.net/nmedia/33/18/02/23/15" +
                                                        "/19577157_sd_013.mp4");
    });

    it("should return high video URL", async function () {
        const url = new URL("https://www.allocine.fr/video" +
                               "/player_gen_cmedia=19583315&cfilm=232669.html");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "https://fr.vid.web.acsta.net/nmedia/33/19/04/02/14" +
                                                       "//19583315_hd_013.mp4");
    });

    it("should return medium video URL", async function () {
        const url = new URL("https://www.allocine.fr/video" +
                                 "/player_gen_cmedia=19432206&cfilm=1051.html");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "https://fr.vid.web.acsta.net/nmedia/s3/33/18/66/14" +
                                                     "/37/19432206_sd_013.mp4");
    });

    it("should return video URL when protocol is HTTP", async function () {
        const url = new URL("http://www.allocine.fr/video" +
                               "/player_gen_cmedia=19131078&cfilm=147912.html");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "http://fr.vid.web.acsta.net/nmedia/s3/33/18/78/52/54" +
                                                        "/19131078_sd_013.mp4");
    });

    it("should return video URL from RSS", async function () {
        const url = new URL("http://rss.allocine.fr/~r/ac/actualites/cine/~3" +
                        "/JT3DmCdQCdQ/fichearticle_gen_carticle=18685966.html");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "http://fr.vid.web.acsta.net/nmedia/33/19/11/22/16" +
                                                       "//19586672_hd_013.mp4");
    });
});
