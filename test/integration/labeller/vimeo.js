import assert                 from "assert";
import { extract as scraper } from "../../../src/core/scrapers.js";
import { extract }            from "../../../src/core/labellers.js";

describe("Labeller: Vimeo", function () {
    it("should return video label", async function () {
        const url = "https://vimeo.com/265045525";
        const options = { depth: 0, incognito: false };

        const file = await scraper(new URL(url), options);
        const label = await extract({ file, label: "" });
        assert.strictEqual(label, "Looking For Something");
    });
});
