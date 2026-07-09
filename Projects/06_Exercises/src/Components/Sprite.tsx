
import { useSprite } from "../Hooks/useSprite"

export const Sprite = () => {

    const { assetSrc, error, loading, handleUserClick } = useSprite()

    return (
        <main>
            <section>
                {assetSrc && <img src={`${assetSrc}`}></img>}
                {error && <p>Ha ocurrido un error al cargar la imagen</p>}
                {loading && <p>Cargando imagen... </p>}
            </section>
            <button onClick={() => handleUserClick()}>Cargar Imagen</button>
        </main>
    )
}   