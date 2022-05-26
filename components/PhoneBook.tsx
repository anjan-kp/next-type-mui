/*
User should be able to add data and it will be desplayed
on the table below with Name in ascending order.
No duplicate data to be added.
Phone field should take only 10 digit numbers.
Table header should be hidden if no data is present.
Make the data persistent till the browser is open.
The component tree should not be modified.
*/
import { useState } from "react";
import Wrapper from "./Wrapper";
import { style } from "../styles/style";


const PhoneBookForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneDairy, setPhoneDairy] = useState<{ Name: string; Phone: string }[]>([],)

    const addRecord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('event :', name, phone);
        setPhoneDairy(pre => [...pre, { Name: name, Phone: phone },]);
        setName(''), setPhone('');
    };
    return (
        <>
            <Wrapper stack>
                <form onSubmit={addRecord} style={style.form.container}>
                    <label>Name:</label>
                    <br />
                    <input style={style.form.inputs} name="n" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label>Phone:</label>
                    <br />
                    <input style={style.form.inputs} name="p" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <br />
                    <input style={style.form.submitBtn} type="submit" value="Add User" disabled={name && phone ? false: true}/>
                </form>
                <div style={style.msg}>
                    <h4>Total Number of Contacts</h4>
                    <h1>{phoneDairy.length}</h1>
                </div>
            </Wrapper>
            <br />
            {phoneDairy.length ? <Wrapper>
                <table style={style.table}>
                    <thead>
                        <tr>
                            <th style={style.tableCell}>Name</th>
                            <th style={style.tableCell}>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phoneDairy.map((book, index)=><tr key={index.toString()}><td>{book.Name}</td><td>{book.Phone}</td></tr>)} 
                    </tbody>
                </table>
            </Wrapper> : null}
        </>
    );
};

// const InformationTable = (listItems: InformationTableProp) => {
//     console.log('listItems : ', listItems);
//     return (
//         <table style={style.table}>
//             <thead>
//                 <tr>
//                     <th style={style.tableCell}>Name</th>
//                     <th style={style.tableCell}>Phone</th>
//                 </tr>
//             </thead>
//             <tbody>

//             </tbody>
//         </table>
//     );
// };

// const Message = () => (
//     <div style={style.msg}>
//         <h4>Total Number of Contacts</h4>
//         <h1>0</h1>
//     </div>
// );

// const FormWrapper = () => (
//     <Wrapper stack>
//         <PhoneBookForm />
//     </Wrapper>
// );
// const InfoWrapper = (bookDetail: infoWrapperProp) => (
//     <Wrapper>
//         <InformationTable phonebookDetail={bookDetail} />
//     </Wrapper>
// );
// export default () => (
//     <>
//         <FormWrapper />
//         <br />
//         <InfoWrapper />
//     </>
// );

export default PhoneBookForm;
