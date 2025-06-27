'use client'

import Input from "@/components/admin/form/input/InputField";
import Select from "@/components/admin/form/Select";
import UserDetailServer, { Department, UserInfo } from "@/app/admin/dashboard/(admin)/user/[id]/(server)/user_detail";
import { useEffect, useState } from "react";
import Label from "@/components/admin/form/Label";
import { useParams } from "next/navigation";
import Checkbox from "@/components/admin/form/input/Checkbox";
import Button from "@/components/admin/ui/button/Button";
import Form from "@/components/admin/form/Form";
import UserDetailUpdatePost from "@/app/admin/dashboard/(admin)/user/[id]/(server)/user_detail_post";
import UserDelete from "@/app/admin/dashboard/(admin)/user/[id]/(server)/user_delete";

async function onSubmit(user: any) {
    const error = await UserDetailUpdatePost(user);

    if (!error) {
        alert("OK");
    }
    else {
        console.log(error);
        alert(error);
    }
}

async function submitDelete(id: string) {
    const result = await UserDelete(id);

}

export default function UserDetail() {

    const params = useParams();
    const id: string | undefined = params.id?.toString();

    const [user, setUser] = useState<any>();
    const [departments, setDepartments] = useState<Department[]>();

    if (id && typeof window !== "undefined") {
        useEffect(() => {
            UserDetailServer(id).then(obj => {

                const u = obj.user;
                setUser(u);
                setDepartments(obj.departments);
            });
        }, [window.location])
    }

    const handleChange = (event: any) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }

    const handleValueChange = (key: string, value: any) => {
        setUser({
            ...user,
            [key]: value
        });
    }

    let date = user?.created_at;
    const spl = date?.split(":");

    if (spl)
        date = spl[0] + ":" + spl[1];

    return (
        <div className={"flex justify-center"}>
            <div className={"w-[75%] align-middle"}>
                <Form onSubmit={() => onSubmit(user)}>
                    <div className={"flex flex-col gap-2"}>
                        <input type="hidden" name={"id"} value={id} />

                        <Label htmlFor={"full_name"}>Full Name</Label>
                        <Input type={"text"} name={"full_name"} onChange={handleChange} defaultValue={user?.full_name} />

                        <Label htmlFor={"place"}>Place</Label>
                        <Input type={"text"} name={"place"} onChange={handleChange} defaultValue={user?.place} placeholder={"Place"} />

                        <Label htmlFor={"phone"}>Phone Number</Label>
                        <Input type={"phone"} name={"phone"} onChange={handleChange} defaultValue={user?.phone} placeholder={"Phone Number"} />

                        <Label htmlFor={"school_number"}>School Number</Label>
                        <Input type={"text"} name={"school_number"} onChange={handleChange} defaultValue={user?.school_number} placeholder={"School Number"} />

                        <Label htmlFor={"department"}>Department</Label>
                        <Select defaultValue={user?.department} placeholder={"Department"} options={
                            departments?.map(x => {
                                return { value: x.id.toString(), label: x.name };
                            }) ?? []
                        } onChange={x => handleValueChange("department", parseInt(x))} />

                        <Label htmlFor={"email"}>E-Mail</Label>
                        <Input type={"email"} disabled={true} name={"email"} onChange={handleChange} defaultValue={user?.email} placeholder={"E-Mail"} />

                        <Label htmlFor={"created_at"}>Created At</Label>
                        <Input type={"datetime-local"} name={"created_at"} disabled={true} onChange={handleChange} defaultValue={date} />

                        <div className={"flex gap-2 w-[100%] justify-center"}>
                            <Checkbox label={"Is Admin"} onChange={x => handleValueChange("is_admin", x)} checked={user?.is_admin ?? false} />
                            <Checkbox label={"Is Special"} onChange={x => handleValueChange("is_special", x)} checked={user?.is_special ?? false} />
                            <Checkbox label={"Is Student"} onChange={x => handleValueChange("is_student", x)} checked={user?.is_student ?? false} />
                        </div>

                        <div className={"flex gap-2 justify-end w-[100%]"}>
                            <Button type={"button"} variant={"outline"} onClick={() => id && submitDelete(id)}>
                                Delete
                            </Button>
                            <Button>
                                Save
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
