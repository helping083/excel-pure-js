export const HEADER = {
  headerHtml: `
      <input type="text" class="input" value="Новая таблица" />
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>`,
  className: 'excel__header',
};
export const headerTemplate = $root =>
  `<input type="text" class="input" value="Новая таблица" />
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>`
