/*
User should be able to add data and it will be desplayed - Done
on the table below with Name in ascending order. - Done
No duplicate data to be added.
Phone field should take only 10 digit numbers.
Table header should be hidden if no data is present.
Make the data persistent till the browser is open.
The component tree should not be modified.
Session storage custome hook for persiting the data.
*/
import { useState, useContext, createContext, useEffect } from "react";
import Wrapper from "./Wrapper";
import { style } from "../styles/style";
import {useLocalStorage} from '../hooks/useStorage';


// type Contexting and creating.
type PhoneListProps = {    
    name: string,
    phone: string    
}
type GlobalContent = {
    phoneList: PhoneListProps[],
    setphoneList:(val: {}) => void
  }
const PhonesBookContext = createContext<GlobalContent | null>(null);

//END

const PhoneBookForm = () => {
    const [formData, setFormData] = useState({
        name:'',
        phone:''
    });
    const phonesList = useContext(PhonesBookContext);
    const [errors, setErrors] = useState({nameError:'', phoneError:''});
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    const addRecord = (e:  React.SyntheticEvent) => {
        e.preventDefault();
        if(validate()){
            phonesList?.savePhonesList(formData);
            setFormData({name:'', phone:''});
            setErrors({nameError:'', phoneError:''});
        }
    };
    const validate = () => {
        const {name, phone} = formData;
        let error = {nameError:'', phoneError: ''};
        // if (!phonesList) return null;
        const { phoneList } = phonesList!;
        let isValid = true;
        let pattern = new RegExp(/^[0-9\b]+$/);
        let namePattern = new RegExp(/^[a-zA-Z]+$/);
        if(name && (!namePattern.test(name)) || (phoneList?.length && phoneList?.some(val=>val.name === name.toUpperCase()))){            
            isValid =  false;
            error.nameError = `Invalid!!!, Name ${namePattern.test(name) ? "exists already":"should be in alphabetic"}.`
        }
        if(phone && (!pattern.test(phone) || phone.length !== 10)){
            isValid = false;
            error.phoneError = 'please enter 10 digit valid phone number.';
        }
        setErrors(error)
        return isValid;
    }
    const {name, phone} = formData;
    return (
        <form autoComplete="off" onSubmit={addRecord} style={style.form.container}>
            <label>Name:</label>
            <br />
            <input style={style.form.inputs} name="name" type="text" value={name} onChange={handleOnChange} />
            <span style={style.error}>{errors.nameError}</span>
            <label>Phone:</label>
            <br />
            <input style={style.form.inputs} name="phone" type="text" value={phone} onChange={handleOnChange} />
            <span style={style.error}>{errors.phoneError}</span>
            <input style={style.form.submitBtn} type="submit" value="Add User" disabled={name && phone ? false : true} />
        </form>
    );
};
const sortedArray = (list:any, val:any) => list?.sort((a:any,b:any)=>{
    if (a.val < b.val)
       return -1;
    else if (a.val == b.val)
       return 0;
    else
       return 1;
});
const InformationTable = () => {
    const phonesContextList = useContext(PhonesBookContext);
    if (!phonesContextList) return null;
    const { phoneDetails } = phonesContextList;
    let updatedArray = sortedArray(phoneDetails, "name");
    return (
        <table style={style.table}>
            {updatedArray.length ? <thead>
                <tr>
                    <th style={style.tableCell}>Name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead> : null}
            <tbody>
                {updatedArray.map((list: { name: string | undefined; phone: string | number | undefined; }, index: number)=><tr key={index}>
                    <td>{list.name}</td>
                    <td>{list.phone}</td>
                </tr>)}
            </tbody>
        </table>
    );
};

const Message = () => {
    const phoneContext = useContext(PhonesBookContext);
    return <div style={style.msg}>
        <h4>Total Number of Contacts</h4>
        <h1>{phoneContext?.phoneDetails.length}</h1>
    </div>
};

const FormWrapper = () => (
    <Wrapper stack>
        <PhoneBookForm />
        <Message/>
    </Wrapper>
);
const InfoWrapper = () => (
    <Wrapper>
        <InformationTable/>
    </Wrapper>
);
export default () => {
    const [phoneDetails, setPhoneDetails] = useState<PhoneListProps[]>([]);
    const [getLocalItems, setLocalItems] = useLocalStorage();
    const LOCAL_KEY = 'PHONEBOOK';
    const savePhonesList = (list: PhoneListProps) => {
        const newList: PhoneListProps = {
            name:list.name.toUpperCase(),
            phone:list.phone
        };
        setPhoneDetails([...phoneDetails, newList]);
        setLocalItems(LOCAL_KEY, [...phoneDetails, newList]);
      };
    useEffect(()=>{
        if(getLocalItems(LOCAL_KEY)){
            setPhoneDetails(getLocalItems(LOCAL_KEY));
        }
    },[]);
    return (
        <PhonesBookContext.Provider value={{phoneDetails, savePhonesList}}>
            <FormWrapper />
            <br />
            <InfoWrapper />
        </PhonesBookContext.Provider>
    );
}