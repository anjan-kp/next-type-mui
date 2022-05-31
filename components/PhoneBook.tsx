/*
User should be able to add data and it will be desplayed - Done
on the table below with Name in ascending order. - Done
No duplicate data to be added.
Phone field should take only 10 digit numbers.
Table header should be hidden if no data is present.
Make the data persistent till the browser is open.
The component tree should not be modified.
*/
import { useState, useContext } from "react";
import Wrapper from "./Wrapper";
import { style } from "../styles/style";
import { PhoneContext } from "./context/PhoneBookContext";

const PhoneBookForm = () => {
    const phoneContext = useContext(PhoneContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    // const [phoneDairy, setPhoneDairy] = useState<{ Name: string; Phone: string }[]>([],)

    const addRecord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('event :', name, phone);
        // setPhoneDairy(pre => [...pre, { Name: name, Phone: phone },]);
        phoneContext?.savePhoneList({name, phone});
        setName(''), setPhone('');
    };

    return (
        <form onSubmit={addRecord} style={style.form.container}>
            <label>Name:</label>
            <br />
            <input style={style.form.inputs} name="n" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <label>Phone:</label>
            <br />
            <input style={style.form.inputs} name="p" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <br />
            <input style={style.form.submitBtn} type="submit" value="Add User" disabled={name && phone ? false : true} />
        </form>
    );
};

const InformationTable = () => {
    const phoneContext = useContext(PhoneContext);
    let sortedArray = phoneContext?.phoneDetails?.sort((a,b)=>{
        if (a.name < b.name)
           return -1;
        else if (a.name == b.name)
           return 0;
        else
           return 1;
    });
    return (
        <table style={style.table}>
            <thead>
                <tr>
                    <th style={style.tableCell}>Name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {sortedArray?.map((list, index)=><tr key={index}>
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

