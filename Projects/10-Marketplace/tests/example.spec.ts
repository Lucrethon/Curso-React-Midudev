import { test, expect } from '@playwright/test';

const localHost = 'http://localhost:5173/'

test('filter products by categoy', async ({ page }) => {
  await page.goto(localHost); 

  await expect.poll(async () => {
    return await page.getByRole('img').count()
  }).toBeGreaterThan(2)
  // esperar que se vean al menos dos imagenes 

  const expectedCategory = 'beauty'
  const filter = await page.getByRole('combobox', {name: 'Category'})
  await filter.selectOption(expectedCategory.toUpperCase())
  await expect(filter).toHaveValue(expectedCategory)

  const productList = page.getByRole('listitem')
  const count = await productList.count();

  for (let i = 0; i < count; i++) {
    await expect(productList.nth(i)).toHaveAttribute('data-category', expectedCategory);
  }

  // La propiedad o método .nth(index) de un Locator en Playwright sirve para seleccionar un elemento específico dentro de un grupo de varios elementos coincidentes, basándose en su posición de índice (empezando desde 0).

  
  // const categories = await productList.evaluateAll(
  //   products => products.map(item => item.getAttribute('data-category'))
  // )
  // const filteredProducts = categories.every(cat => cat === expectedCategory); 
  // expect(filteredProducts).toBe(true)


});


test('filter products by price', async ({ page }) => {
  await page.goto(localHost); 

  //esperar que se vean al menos dos imágenes 
  await expect.poll(async () => {
    return await page.getByRole('img').count()
  }).toBeGreaterThan(2)

  const expectedPrice = 50
  const filter = await page.getByRole('slider', {name: 'Max Price'}).fill(expectedPrice.toString())
  const productList = page.getByRole('listitem')

  await expect.poll(async () =>{
    const prices = productList.evaluateAll(items => 
      items.map(item => Number(item.getAttribute('data-price')))
    ); 
    return (await prices).every(price => price <= expectedPrice)
  }).toBe(true)

})


test('add product to cart', async({ page }) => {
  await page.goto(localHost)

  const products = page.getByTestId('product')

  // Esperar a que haya más de 6 productos cargados
  await expect.poll(async () => {
    return products.count()
  }).toBeGreaterThan(6)

  // const firstProduct = page.getByTestId('product').first()

  const productButtons = products.getByRole('button')

  // Verificacion de que todos los botones tengan la clase inicial 'button-add-to-cart'
  await expect.poll(async () => {
    const classNames = productButtons.evaluateAll(buttons => 
      buttons.map(button => button.className)
    ); 
    return (await classNames).every(cls => cls.includes('button-add-to-cart'));
  }).toBe(true)

  // locator de los dos primeros productos
  const button_item_1 = productButtons.nth(0) 
  const button_item_2 = productButtons.nth(1)

  // interaccion con los productos seleccionados para agregar dos productos al carrito
  await button_item_1.click()
  await button_item_2.click()

  // verificar que despues de la interaccion, el boton tenga la clase 'button-remove-from-cart'
  await expect(button_item_1).toHaveClass(/button-remove-from-cart/)
  await expect(button_item_2).toHaveClass(/button-remove-from-cart/)

  // verificar que el footer del carrito se muestre
  const footerCart = page.getByTestId('footer-cart')
  await expect(footerCart).toBeVisible()

  // abrir el carrito y verificar que se muestre
  await footerCart.getByRole('button').click()
  const modalCartWindow = page.getByTestId('modal-cart-window')
  await expect(modalCartWindow).toBeVisible()

  // verificar que hay dos productos en el carrito 
  const cart = modalCartWindow.getByRole('listitem')
  await expect(cart).toHaveCount(2)


})