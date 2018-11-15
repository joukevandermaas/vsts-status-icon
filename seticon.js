(() => {
  const size = 16;
  let oldFavIconHref = '';

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const getLinkElement = () => {
    let links = document.querySelectorAll('link#page-icon');

    if (links.length) {
      return links[0];
    } else {
      let link = document.createElement('link');
      link.id = "page-icon";

      document.head.appendChild(link);

      return link
    }
  };

  const createImageFromSelector = (selector) => {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let icon = document.querySelector(selector);

    let style = getComputedStyle(icon);
    icon.color = style.color;

    let xml = new XMLSerializer().serializeToString(icon);
    let svg64 = btoa(xml);
    let b64Start = 'data:image/svg+xml;base64,';
    let image64 = b64Start + svg64;

    let imgElement = document.createElement('img');
    imgElement.src = image64;

    ctx.drawImage(imgElement, 0, 0, size, size)

    return true;
  };

  const originalLinkHref = getLinkElement().href;

  setInterval(() => {
  	let query = window.location.search.toLowerCase();

    var success = false;

    if (query.indexOf('buildid') !== -1) {
      success = createImageFromSelector('.result-status svg');
    } else if (query.indexOf('releaseid') !== -1) {
      success = createImageFromSelector('.cd-environment-status-badge svg');
    }

    if (!success) {
      // we're not on a build page
      let link = getLinkElement();

      link.href = originalLinkHref;

      return;
    }

    // generate image
    let link = getLinkElement();

    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';

    link.href = canvas.toDataURL("image/x-icon");
  }, 1000);

  console.log('Status favicon: running');
})()

