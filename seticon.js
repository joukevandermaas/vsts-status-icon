(() => {
  const size = 16;

  setInterval(() => {
  	let query = window.location.search.toLowerCase();

    if (query.indexOf('buildid') === -1) {
    	// we're not on a build page
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

    // circle to make sure the icon is visible
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(size/2, size/2 - 1, size/2, 0, Math.PI * 2, true);
    ctx.fill();

    // draw the icon
    ctx.font = `${size - 1.5}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(content, size/2 - 0.5, size/2);

    // generate image
    let existingLinks = document.querySelectorAll('link#page-icon');
    let link;

    if (existingLinks.length) {
      link = existingLinks[0];
    } else {
      link = document.createElement('link');
      link.id = "page-icon";
    }

    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';

    link.href = canvas.toDataURL("image/x-icon");
    document.getElementsByTagName('head')[0].appendChild(link);
  }, 1000);

  console.log('Status favicon: running');
})()
