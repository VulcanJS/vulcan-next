import React from "react";
import Router from "next/router";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

import { User } from "~/models/user";
import { useUser } from "~/components/user/hooks";
import {
    useCreate,
    useMulti,
    useUpdate,
    useDelete,
} from "@vulcanjs/react-hooks";


export default function UserCrudPage() {
    // Auth
    const user = useUser({ redirectTo: "/login" });

    // Create
    /* 
    
    Before creating a user with useCreate, we need to modify the password fields. That's what is done by the vulcan-next API, so we use the it here.
    You can see below this page an example with useCreate that will throw because of the password field.

    */
    async function handleCreateSubmit(e) {
        e.preventDefault();

        const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            isAdmin: e.currentTarget.isAdmin.checked || null,
            groups: e.currentTarget.groups.value || null,
        };

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!(res.status === 200)) {
                throw new Error(await res.text());
            }
            Router.reload(); // reload to refresh the users list because useMulti doesn't update after user operations
        } catch (error) {
            console.error("An unexpected error happened occurred:", error);
        }
    }
    // Read
    const readFields = ['_id', 'createdAt', 'email', 'username', 'isAdmin', 'groups'];
    const rawResult = useMulti({ model: User });
    const usersResult = rawResult.documents || [];

    // Select
    const [selectedUserId, setSelectedUserId] = React.useState('');
    const selectedUser = usersResult.find(user => user._id === selectedUserId);
    const handleSelectChange = (event) => {
        setSelectedUserId(event.target.value);
    };

    // Update
    const [updateUser] = useUpdate({ model: User });
    async function handleUpdateSubmit(e) {
        e.preventDefault();

        if (!selectedUserId) {
            throw new Error("Trying to update without userId, this shouldn't happen");
        }

        const input = {
            id: selectedUserId,
            data: {
                email: e.currentTarget.updateEmail.value || selectedUser.email,
                username: e.currentTarget.updateUsername.value || null,
                isAdmin: e.currentTarget.updateIsAdmin.checked || null,
                groups: e.currentTarget.updateGroups.value || null
            }
        };

        await updateUser({ input });
        Router.reload(); // reload to refresh the users list because useMulti doesn't update after user operations
    }

    // Delete
    const [deleteUser] = useDelete({ model: User });
    const handleDelete = async () => {
        if (!selectedUserId) {
            throw new Error("Trying to delete without id, this shouldn't happen");
        }
        const id = selectedUserId;
        setSelectedUserId('')
        const input = {
            id
        };
        await deleteUser({ input });
        Router.reload(); // reload to refresh the users list because useMulti doesn't update after user operations
    }

    return (
        <div>
            <h1> User Crud page</h1>
            <h2> Create </h2>
            <form
                onSubmit={handleCreateSubmit}
            >
                <label>
                    <span>Email</span>
                    <input type="text" name="email" required />
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" required />
                </label>
                <label>
                    <span>isAdmin</span>
                    <input type="checkbox" name="isAdmin" />
                </label>
                <label>
                    <span>Groups</span>
                    <input type="text" name="groups" />
                </label>
                <button type="submit">Submit</button>
            </form>


            <h2> Read </h2>
            {<ul>
                {usersResult.map((result) => (
                    <li key={result._id}>
                        {readFields.map((field) => (
                            result[field]
                                ? <p key={result._id + field}> <strong>{field}:</strong> {String(result[field])} </p>
                                : null
                        ))}
                    </li>
                ))}
            </ul>}

            <hr />

            <h2> Choose the user </h2>
            <FormControl>
                <InputLabel id="updateUserLabel" >
                    User
                </InputLabel>
                <Select
                    labelId="updateUserLabel"
                    id="updatedUserSelectId"
                    value={selectedUserId}
                    onChange={handleSelectChange}
                    style={{ minWidth: '120px' }}
                >
                    <MenuItem value=''><em>None</em> </MenuItem>
                    {usersResult.map((result) => (
                        <MenuItem
                            key={result._id}
                            value={result._id}
                        >
                            {result.email}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            {selectedUserId && (
                <div>
                    <h2> Update {selectedUserId} </h2>
                    <form
                        onSubmit={handleUpdateSubmit}
                    >
                        <label>
                            <span>New Email</span>
                            <input type="text" name="updateEmail" defaultValue={selectedUser?.email} />
                        </label>
                        <label>
                            <span>Username</span>
                            <input type="text" name="updateUsername" defaultValue={selectedUser?.username} />
                        </label>
                        <label>
                            <span>isAdmin</span>
                            <input type="checkbox" id="updateIsAdmin" name="updateIsAdmin" defaultChecked={selectedUser?.isAdmin} />
                        </label>
                        <label>
                            <span>Groups</span>
                            <input type="text" name="updateGroups" defaultValue={selectedUser?.groups} />
                        </label>
                        <button type="submit">Submit</button>
                    </form>

                    <h2> Delete </h2>
                    <Button color={'secondary'} onClick={() => handleDelete()}> Delete user</Button>
                </div>
            )}
            <style jsx>
                {`
                    label {
                        display: flex;
                        flex-flow: column;
                    }
                    label > span {
                        font-weight: 600;
                    }
                    input {
                        padding: 6px;
                        margin: 0.3rem 0 0.6rem;
                    }
                `}
            </style>
        </div >
    );
};


// useCreate example
/*

const [createUser] = useCreate({ model: User });
async function handleCreateSubmit(e) {
    e.preventDefault();

    const input = {
        data: {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            isAdmin: e.currentTarget.isAdmin.value || null,
            groups: e.currentTarget.groups.value || null,
        }
    };

    await createUser({ input });
}

*/