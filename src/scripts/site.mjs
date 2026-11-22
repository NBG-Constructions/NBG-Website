import { validateEnquiry, formatEnquiry, serviceNames } from './enquiry.mjs';

const menu = document.querySelector('[data-menu]');
const menuButton = document.querySelector('[data-menu-toggle]');
const closeMenu = () => { menuButton?.setAttribute('aria-expanded', 'false'); menu?.classList.remove('is-open'); };
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (menu && !menu.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
matchMedia('(min-width: 900px)').addEventListener('change', closeMenu);

const filters = document.querySelector('[data-project-filters]');
const selectedSector = new URL(location.href).searchParams.get('sector');
if (!filters && ['education', 'office', 'hospitality-retail'].includes(selectedSector)) {
  // A filtered card carries the sector into its detail URL, so reload and return keep context.
  document.querySelectorAll('main a[href="/projects/"]').forEach(link => {
    link.href = `/projects/?sector=${selectedSector}`;
  });
}
if (filters) {
  const update = () => {
    const sector = new URL(location.href).searchParams.get('sector') || 'all';
    let count = 0;
    document.querySelectorAll('[data-project-sector]').forEach(card => {
      card.hidden = sector !== 'all' && card.dataset.projectSector !== sector;
      const link = card.querySelector('a');
      const url = new URL(link.href);
      if (sector === 'all') url.searchParams.delete('sector'); else url.searchParams.set('sector', sector);
      link.href = url.pathname + url.search;
      if (!card.hidden) count++;
    });
    filters.querySelectorAll('a').forEach(link => {
      const selected = link.dataset.filter === sector;
      if (selected) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
    });
    document.querySelector('[data-project-count]').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
    document.querySelector('[data-project-empty]').hidden = count !== 0;
  };
  filters.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    history.pushState(null, '', link.href);
    update();
  });
  addEventListener('popstate', update);
  update();
}

const form = document.querySelector('[data-enquiry]');
if (form) {
  form.querySelector('[data-prepare]').disabled = false;
  const summary = document.querySelector('[data-errors]');
  const draft = document.querySelector('[data-draft]');
  const output = document.querySelector('[data-enquiry-text]');
  let attempted = false;
  const service = new URL(location.href).searchParams.get('service');
  if (serviceNames.includes(service)) form.elements.service.value = service;
  const renderErrors = errors => {
    form.querySelectorAll('[data-error]').forEach(node => {
      const name = node.dataset.error;
      node.textContent = errors[name] || '';
      node.hidden = !errors[name];
      const field = form.elements[name];
      if (errors[name]) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
    });
    summary.replaceChildren();
    summary.hidden = !Object.keys(errors).length;
    if (!summary.hidden) {
      const heading = document.createElement('p'); heading.textContent = 'Please check the following fields:'; summary.append(heading);
      const list = document.createElement('ul');
      for (const [name, message] of Object.entries(errors)) {
        const item = document.createElement('li'); const link = document.createElement('a');
        link.href = `#${name}`; link.textContent = message;
        link.addEventListener('click', event => { event.preventDefault(); form.elements[name].focus(); });
        item.append(link); list.append(item);
      }
      summary.append(list);
    }
  };
  form.addEventListener('submit', event => {
    event.preventDefault(); attempted = true;
    const data = Object.fromEntries(new FormData(form));
    const errors = validateEnquiry(data); renderErrors(errors);
    if (Object.keys(errors).length) { draft.hidden = true; summary.focus(); return; }
    output.value = formatEnquiry(data);
    draft.hidden = false; draft.focus();
  });
  form.addEventListener('input', () => {
    // Invalidate prepared text when the author changes a field; never retain a stale enquiry.
    draft.hidden = true; output.value = '';
    if (attempted) renderErrors(validateEnquiry(Object.fromEntries(new FormData(form))));
  });
  document.querySelector('[data-copy-enquiry]').addEventListener('click', async () => {
    const status = document.querySelector('[data-copy-status]');
    try { await navigator.clipboard.writeText(output.value); status.textContent = 'Copied. No enquiry has been sent.'; }
    catch { output.focus(); output.select(); status.textContent = 'Select and copy the text above. No enquiry has been sent.'; }
  });
  document.querySelector('[data-download-enquiry]').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([output.value], {type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = 'NBG-enquiry.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}
