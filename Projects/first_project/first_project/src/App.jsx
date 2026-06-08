import { TwitterCard } from './TwitterFollowCard.jsx'


export function App() {
  return (
    <div className="tw-followCards">
      <TwitterCard 
        username="Super Lulu" 
        accountName="@super_lulu" 
        avatarUrl="https://api.dicebear.com/10.x/lorelei/svg?seed=Felix" 
      />
      <TwitterCard 
        username="Miguel Ángel" 
        accountName="@midudev" 
        avatarUrl="https://api.dicebear.com/10.x/lorelei/svg?seed=Max" 
      />
    </div>
  );
}

// En React, no debes invocar un componente como si fuera una función normal de JavaScript (es decir, TwitterCard(...)). En su lugar, debes usar la sintaxis de JSX pasando las propiedades como atributos: <TwitterCard username="..." />.

// En las versiones modernas de React, ya no es necesario importar React para usar JSX. Por lo tanto, la forma más recomendada y moderna de usar un React.Fragment es utilizar su sintaxis corta: <> para abrir y </> para cerrar.