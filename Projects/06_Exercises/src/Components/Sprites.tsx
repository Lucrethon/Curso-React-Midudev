import { useSprites } from "../Hooks/useSprites"

const Images = (assetsSrc: string[]) => {
    
    return assetsSrc.map(
        (asset: string, index: number) => {
            return (
                <div>
                    <img key={index} src={`${asset}`}></img>
                </div>
            )
    })
}

export const Sprites = () => {

    const { assetsSrc, error, loading, handleUserClick } = useSprites()

    return (
        <main>
            <section>
                {assetsSrc && Images(assetsSrc)}
                {error && <p>Ha ocurrido un error al cargar las imagenes</p>}
                {loading && <p>Cargando imagenes... </p>}
            </section>
            <button onClick={() => handleUserClick()}>Cargar Imagenes</button>
        </main>
    )
}   