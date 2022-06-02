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
import { useState, useContext } from "react";
import Wrapper from "./Wrapper";
import { style } from "../styles/style";
import { PhoneContext } from "./context/PhoneBookContext";

const PhoneBookForm = () => {
    const phoneContext = useContext(PhoneContext);
    const [formData, setFormData] = useState({
        name:'',
        phone:''
    });
    const [errors, setErrors] = useState({nameError:'', phoneError:''});
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    const addRecord = (e:  React.SyntheticEvent) => {
        e.preventDefault();
        console.log('Error :', errors);
        if(validate()){
            phoneContext?.savePhoneList(formData);
            setFormData({name:'', phone:''});
            setErrors({nameError:'', phoneError:''});
        }
    };
    const validate = () => {
        const {name, phone} = formData;
        let error = {nameError:'', phoneError: ''};
        if (!phoneContext) return null;
            const { phoneDetails } = phoneContext;
            console.log('phonedetails :', phoneDetails);
        let isValid = true;
        let pattern = new RegExp(/^[0-9\b]+$/);
        if(name && phoneDetails?.length && phoneDetails?.some(val=>val.name === name.toUpperCase())){            
            isValid =  false;
            error.nameError = 'Invalid!!!, Name exists already.'
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
    const phoneContext = useContext(PhoneContext);
    if (!phoneContext) return null;
    const { phoneDetails } = phoneContext;
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
                {updatedArray?.map((list: { name: string | undefined; phone: string | number | undefined; }, index: number)=><tr key={index}>
                    <td>{list.name}</td>
                    <td>{list.phone}</td>
                </tr>)}
            </tbody>
        </table>
    );
};

const Message = () => {
    const phoneContext = useContext(PhoneContext);
    return <div style={style.msg}>
        <h4>Total Number of Contacts</h4>
        <h1>{phoneContext?.phoneDetails?.length}</h1>
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
export default () => (
    <>
        <FormWrapper />
        <br />
        <InfoWrapper />
    </>
);

