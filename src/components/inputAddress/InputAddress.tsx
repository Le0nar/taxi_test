type InputAddressProps = {
    address: string,
    setAddress: any
}


const InputAddress:React.FC<InputAddressProps> = ({address, setAddress}) => {
// TODO: использовать стейт родителя

    const setX = (event: any) => {
        const value = event.target.value; 
        setAddress(value)


        const regexp = /(\S+\s){1,3}\S+/
        const verifedValue = value.match(regexp)

        if (verifedValue) {
            // TODO: вызвать функцию, которая ставит метку на координаты из геокодирования
            console.log(verifedValue[0])
        }
        
    }

    return (
        <div className="input-adress">
            <label>Откуда</label>
            <input type="text"  onChange={setX} value={address} />
        </div>
    )
}

export default InputAddress