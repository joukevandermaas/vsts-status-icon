(() => {
  const size = 16;
  let oldFavIconHref = '';

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

  const originalLinkHref = getLinkElement().href;

  setInterval(() => {
  	let query = window.location.search.toLowerCase();

    if (query.indexOf('buildid') === -1) {
      // we're not on a build page
      let link = getLinkElement();

      link.href = originalLinkHref;

      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    let icon = document.querySelector('.result-status i[role="presentation"]');
    let content = icon.innerText;
    let style = getComputedStyle(icon);

    let { color, fontFamily } = style;

    ctx.font = `${size - 1.5}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let diameter = ctx.measureText(content).width;
    let pos = (size - diameter) / 2;

    // circle to make sure the icon is visible
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(size/2, size/2 + 1, diameter / 2, 0, Math.PI * 2, true);
    ctx.fill();

    // draw the icon
    ctx.fillStyle = color;
    ctx.fillText(content, size/2 - 0.5, size/2);

    // generate image
    let link = getLinkElement();

    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';

    link.href = canvas.toDataURL("image/x-icon");
  }, 1000);

  console.log('Status favicon: running');
})()
