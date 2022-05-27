/*
User should be able to add data and it will be desplayed
on the table below with Name in ascending order.
No duplicate data to be added.
Phone field should take only 10 digit numbers.
Table header should be hidden if no data is present.
Make the data persistent till the browser is open.
The component tree should not be modified.
*/
import Wrapper from "./Wrapper";
import { style } from "../styles/style";

const PhoneBookForm = () => {
    const addRecord = (e: any): void => {
        e.preventDefault();
    };

    return (
        <form autoComplete="off" onSubmit={addRecord} style={style.form.container}>
            <label>Name:</label>
            <br />
            <input style={style.form.inputs} name="n" type="text" />
            <br />
            <label>Phone:</label>
            <br />
            <input style={style.form.inputs} name="p" type="text" />
            <br />
            <input style={style.form.submitBtn} type="submit" value="Add User" />
        </form>
    );
};

const InformationTable = () => {
    return (
        <table style={style.table}>
            <thead>
                <tr>
                    <th style={style.tableCell}>Name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
        </table>
    );
};

const Message = () => (
    <div style={style.msg}>
        <h4>Total Number of Contacts</h4>
        <h1>0</h1>
    </div>
);

const FormWrapper = () => (
    <Wrapper stack>
        <PhoneBookForm />
        <Message />
    </Wrapper>
);
const InfoWrapper = () => (
    <Wrapper>
        <InformationTable />
    </Wrapper>
);
export default () => (
    <>
        <FormWrapper />
        <br />
        <InfoWrapper />
    </>
);
