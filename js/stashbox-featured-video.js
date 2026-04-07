(function () {
  "use strict";

  var DATASET_URL = "./data/stashbox-latest-videos.json";
  var YOUTUBE_CHANNEL_ID = "";
  var YOUTUBE_API_KEY = "";
  var MAX_RESULTS = 20;

  var titleEl = document.getElementById("stashbox-featured-title");
  var metaEl = document.getElementById("stashbox-featured-meta");
  var descriptionEl = document.getElementById("stashbox-featured-description");
  var thumbEl = document.getElementById("stashbox-featured-thumb");
  var thumbLinkEl = document.getElementById("stashbox-featured-thumb-link");
  var watchLinkEl = document.getElementById("stashbox-featured-watch");

  if (!titleEl || !metaEl || !descriptionEl || !thumbEl || !thumbLinkEl || !watchLinkEl) {
    return;
  }

  function formatDate(isoDate) {
    if (!isoDate) {
      return "";
    }

    var parsedDate = new Date(isoDate);
    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  function getThumbnailUrl(video) {
    if (video.thumbnailUrl) {
      return video.thumbnailUrl;
    }

    if (!video.videoId) {
      return "";
    }

    return "https://i.ytimg.com/vi/" + encodeURIComponent(video.videoId) + "/hqdefault.jpg";
  }

  function getWatchUrl(video) {
    if (video.watchUrl) {
      return video.watchUrl;
    }

    if (!video.videoId) {
      return "https://www.youtube.com/@stashboxband";
    }

    return "https://www.youtube.com/watch?v=" + encodeURIComponent(video.videoId);
  }

  function pickRandomVideo(videos) {
    var safeVideos = videos.filter(function (video) {
      return video && (video.videoId || video.watchUrl);
    });

    if (!safeVideos.length) {
      return null;
    }

    var index = Math.floor(Math.random() * safeVideos.length);
    return safeVideos[index];
  }

  function renderVideo(video, poolSize, dataSourceLabel) {
    if (!video) {
      titleEl.textContent = "No featured video available right now.";
      metaEl.textContent = "Please check back soon.";
      descriptionEl.textContent = "";
      return;
    }

    var watchUrl = getWatchUrl(video);
    var thumbnailUrl = getThumbnailUrl(video);
    var dateLabel = formatDate(video.publishedAt);

    titleEl.textContent = video.title || "Featured Stashbox Upload";
    descriptionEl.textContent = video.description || "";

    var parts = [];
    if (dateLabel) {
      parts.push("Published " + dateLabel);
    }
    if (video.duration) {
      parts.push(video.duration);
    }
    if (poolSize) {
      parts.push("Randomized from " + poolSize + " videos");
    }
    if (dataSourceLabel) {
      parts.push(dataSourceLabel);
    }

    metaEl.textContent = parts.join(" • ");

    if (thumbnailUrl) {
      thumbEl.src = thumbnailUrl;
    }

    thumbLinkEl.href = watchUrl;
    watchLinkEl.href = watchUrl;
  }

  function mapApiItemsToVideos(items) {
    return items.map(function (item) {
      var snippet = item.snippet || {};
      var resourceId = snippet.resourceId || {};
      return {
        videoId: resourceId.videoId,
        title: snippet.title || "",
        description: snippet.description || "",
        publishedAt: snippet.publishedAt || "",
        thumbnailUrl: snippet.thumbnails && snippet.thumbnails.high ? snippet.thumbnails.high.url : ""
      };
    });
  }

  function fetchLatestUploadsFromApi() {
    // Developer note:
    // To enable live YouTube fetching, set YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID,
    // then fetch the channel uploads playlist and pull its latest 20 items.
    // Keep DATASET_URL as fallback for local/dev and API quota failures.
    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
      return Promise.resolve(null);
    }

    var channelApiUrl = "https://www.googleapis.com/youtube/v3/channels" +
      "?part=contentDetails&id=" + encodeURIComponent(YOUTUBE_CHANNEL_ID) +
      "&key=" + encodeURIComponent(YOUTUBE_API_KEY);

    return fetch(channelApiUrl)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("channels API request failed");
        }
        return response.json();
      })
      .then(function (channelData) {
        var uploadsPlaylistId = channelData && channelData.items && channelData.items[0] &&
          channelData.items[0].contentDetails &&
          channelData.items[0].contentDetails.relatedPlaylists &&
          channelData.items[0].contentDetails.relatedPlaylists.uploads;

        if (!uploadsPlaylistId) {
          throw new Error("uploads playlist not found");
        }

        var playlistApiUrl = "https://www.googleapis.com/youtube/v3/playlistItems" +
          "?part=snippet&maxResults=" + MAX_RESULTS +
          "&playlistId=" + encodeURIComponent(uploadsPlaylistId) +
          "&key=" + encodeURIComponent(YOUTUBE_API_KEY);

        return fetch(playlistApiUrl);
      })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("playlistItems API request failed");
        }
        return response.json();
      })
      .then(function (playlistData) {
        return mapApiItemsToVideos((playlistData && playlistData.items) || []);
      })
      .catch(function () {
        return null;
      });
  }

  function fetchFallbackDataset() {
    return fetch(DATASET_URL)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("fallback dataset not found");
        }
        return response.json();
      })
      .then(function (videos) {
        if (!Array.isArray(videos)) {
          throw new Error("fallback dataset malformed");
        }
        return videos.slice(0, MAX_RESULTS);
      });
  }

  function init() {
    fetchLatestUploadsFromApi()
      .then(function (apiVideos) {
        if (apiVideos && apiVideos.length) {
          return {
            videos: apiVideos.slice(0, MAX_RESULTS),
            source: "Live YouTube API"
          };
        }

        return fetchFallbackDataset().then(function (localVideos) {
          return {
            videos: localVideos,
            source: "Local fallback dataset"
          };
        });
      })
      .then(function (result) {
        var selectedVideo = pickRandomVideo(result.videos);
        renderVideo(selectedVideo, result.videos.length, result.source);
      })
      .catch(function () {
        renderVideo(null, 0, "");
      });
  }

  init();
})();
