import "./character_card.css"

// Una convención muy común en React + TypeScript es crear un tipo exclusivo para las Props del componente (usualmente llamado ComponenteProps). Si tel componente solo va a recibir un personaje individual, puedes definirse así:

// Tipo base
export type Character = {
    id: number;
    name: string;
    image: string;
    rol: string;
    level: number;
    isLocked: boolean;

}; 

// Tipo de las Props que va a recibir el componente
export type CharacterCardProps = {
    character: Character; // Aquí indicas que esperas una propiedad llamada 'character'
}

export function CharacterCard ({ character }: CharacterCardProps) {
    return (
        <article className="ch-characterCard">
            <header className="ch-characterCard-header">
                <img
                alt="Character"
                className="ch-characterCard-image"
                src={character.image}
                ></img>

                <div className="ch-characterCard-info">
                    <strong className="ch-characterCard-name">{character.name}</strong>
                    <span className="ch-characterCard-class">{character.rol}</span>

                </div>
            </header>

            <aside>
                <span className="ch-characterCard-level">{character.level}</span>
            </aside>

        </article>
    )
}; 