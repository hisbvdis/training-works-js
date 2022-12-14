genBtn.addEventListener("click", async (evt) => {
  const agencies = await fetch("./files/agencies.json")
    .then((r) => r.json())
    .then((data) => data);
  const feeds = await fetch("./files/feeds.json")
    .then((r) => r.json())
    .then((data) => data);

  const feedLinks = feeds
    // .slice(0,100)
    .map((feed) => feed.urls.static_current)

  const uniqueFeedLinks = [...new Set(feedLinks)];

  const uniqueFeeds = uniqueFeedLinks.map((link) =>
    feeds.find((feed) => feed.urls.static_current === link)
  );

  // uniqueFeeds.slice(0, 10).forEach((feed, i) => {
  uniqueFeeds.forEach((feed, i) => {
    const feedID = feed.id;
    const feedOnestopId = feed.onestop_id;
    const feedTransitLandURL = `https://www.transit.land/feeds/${feedOnestopId}`;
    const feedDirectLoadLink = feed.urls.static_current;
    const feedLicenseUrl = feed.license.url || null;

    const agency = agencies.find((agency) =>
      agency.operator?.feeds?.some((feed) => feed.id === feedID)
    );
    if (!agency) return;
    const agencyName = agency.agency_name;
    const agencyOfficialURL = agency.agency_url;
    const agencyTransitLandURL = `https://www.transit.land/operators/${agency.onestop_id}`;
    // console.log( agency )
    let country, region, city;
    if (agency.places) {
      [country, region, city] = Object.values(agency.places[0]);
    }
    city = city === region ? null : city;

    const columns = {
      agencyName: agencyName,
      agencyOfficialURL: agencyOfficialURL,
      agencyTransitLandURL: agencyTransitLandURL,
      feedTransitLandURL: feedTransitLandURL,
      feedDirectLoadLink: feedDirectLoadLink,
      feedLicenseUrl: feedLicenseUrl,
      country: country,
      region: region,
      city: city,
    };

    if (i === 0) {
      theadRow.insertAdjacentHTML(
        "beforeEnd",
        `<tr>${Object.keys(columns)
          .map((col) => `<th>${col}</th>`)
          .join("")}</tr>`
      );
    }

    tbody.insertAdjacentHTML(
      "beforeEnd",
      `<tr>${Object.values(columns)
        .map((col) => `<td>${col}</td>`)
        .join("")}</tr>`
    );
  });
});
