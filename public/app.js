document.addEventListener('click', ({ target }) => {
  if (target.dataset.type === 'remove') {
    const id = target.dataset.id;

    remove(id).then(() => {
      target.closest('li').remove();
    });
  }

  if (target.dataset.type === 'edit') {
    const id = target.dataset.id;

    const title = prompt(
      'Please enter new title:',
      target.parentElement.previousElementSibling.textContent
    );

    if (!title) return false;

    update(id, title).then(() => {
      target.parentElement.previousElementSibling.textContent = title;
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

async function update(id, title) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, title }),
  };
  await fetch(`/${id}`, requestOptions);
}
