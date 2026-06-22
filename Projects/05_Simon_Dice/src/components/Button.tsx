  // --------- custom button --------------

export const Button = ({func, children}: {func: () => void, children: string}) => {
      return (
      <section>
      <div className='buttons'>
        <button onClick={func}>{children}</button>
      </div>
    </section>
    
      )
  }; 
