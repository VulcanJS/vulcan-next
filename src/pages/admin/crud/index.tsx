import React from "react";
import models from "~/models";
import Link from 'next/link';

const ModelsPage = () => {
    return (
        <div>
            <h1>Admin page</h1>
            <ul>
                {models.map((model) => (
                    <li>
                        <Link href={'/admin/crud/' + model.name}>
                            <a>{model.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ModelsPage;
