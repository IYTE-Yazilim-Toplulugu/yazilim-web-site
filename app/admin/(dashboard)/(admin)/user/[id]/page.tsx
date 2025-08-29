'use client'
import Input from "@/components/admin/form/input/InputField";
import Select from "@/components/admin/form/Select";
import UserDetailServer, { Department } from "@/app/admin/(dashboard)/(admin)/user/[id]/(server)/user_detail";
import { useEffect, useState } from "react";
import Label from "@/components/admin/form/Label";
import { redirect, useParams } from "next/navigation";
import Checkbox from "@/components/admin/form/input/Checkbox";
import Button from "@/components/admin/ui/button/Button";
import Form from "@/components/admin/form/Form";
import UserDetailUpdateServer from "@/app/admin/(dashboard)/(admin)/user/[id]/(server)/user_detail_update";
import UserDeleteServer from "@/app/admin/(dashboard)/(admin)/user/[id]/(server)/user_delete";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

import { UserInfo } from "@/types/types_user";
import handleErrorCode from "@/components/handle-error-code";

async function onSubmit(user: any) {
    const { error } = await UserDetailUpdateServer(user);

    if (!error) {
        toast({
            title: "Success",
            description: "User updated successfully.",
            variant: "success",
        });
    }
    else {
        console.error(error);
        // @ts-ignore
        handleErrorCode(error.code);
    }
}

async function submitDelete(id: string) {
    if (!confirm("Are you sure?"))
        return;

    const error = await UserDeleteServer(id);

    if (!error) {
        toast({
            variant: "default",
            description: "Success",
        });
        redirect('/admin/user/all');
    }
    else {
        console.log(error);
        toast({
            variant: "default",
            description: "See console.",
            title: "Failed"
        });
    }
}

export default function UserDetail() {

    const params = useParams();
    const id: string | undefined = params.id?.toString();

    const [user, setUser] = useState<UserInfo>();
    const [departments, setDepartments] = useState<Department[]>();

    if (id && typeof window !== "undefined") {
        useEffect(() => {
            UserDetailServer(id).then(obj => {
                const u = obj.user;
                setUser(u ? u : undefined);
                setDepartments(obj.departments);
            });
        }, [window.location])
    }

    const handleChangeEvent = (event: any) => handleChange(event.target.name, event.target.value);
    const handleChange = (key: string, value: any) => {
        // @ts-ignore
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
                        <Input type={"text"} name={"full_name"} onChange={handleChangeEvent} defaultValue={user?.full_name} />

                        <Label htmlFor={"place"}>Place</Label>
                        <Input type={"text"} name={"place"} onChange={handleChangeEvent} defaultValue={user?.place} placeholder={"Place"} />

                        <Label htmlFor={"phone"}>Phone Number</Label>
                        <Input type={"phone"} name={"phone"} onChange={handleChangeEvent} defaultValue={user?.phone} placeholder={"Phone Number"} />

                        <Label htmlFor={"school_number"}>School Number</Label>
                        <Input type={"text"} name={"school_number"} onChange={handleChangeEvent} defaultValue={user?.school_number} placeholder={"School Number"} />

                        <Label htmlFor={"department"}>Department</Label>
                        <Select defaultValue={user?.department?.toString()} placeholder={"Department"} options={
                            departments?.map(x => {
                                return { value: x.id.toString(), label: x.name };
                            }) ?? []
                        } onChange={x => handleChange("department", parseInt(x))} />

                        <Label htmlFor={"email"}>E-Mail</Label>
                        <Input type={"email"} disabled={true} name={"email"} onChange={handleChangeEvent} defaultValue={user?.email} placeholder={"E-Mail"} />

                        <Label htmlFor={"created_at"}>Created At</Label>
                        <Input type={"datetime-local"} name={"created_at"} disabled={true} onChange={handleChangeEvent} defaultValue={date} />

                        <div className={"flex gap-2 w-[100%] justify-center"}>
                            <Checkbox label={"Is Admin"} onChange={x => handleChange("is_admin", x)} checked={user?.is_admin ?? false} />
                            <Checkbox label={"Is Special"} onChange={x => handleChange("is_special", x)} checked={user?.is_special ?? false} />
                            <Checkbox label={"Is Student"} onChange={x => handleChange("is_student", x)} checked={user?.is_student ?? false} />
                            <Checkbox label={"From Iztech"} onChange={x => handleChange("from_iztech", x)} checked={user?.from_iztech ?? false} />
                        </div>

                        <div className={"flex w-[100%]"}>
                            <div className={"gap-2 flex items-center"}>

                                <Link type={"button"} href={"/admin/user/all"}>
                                    Back
                                </Link>
                            </div>
                            <div className={"gap-2 flex justify-end w-[100%]"}>
                                <Button type={"button"} variant={"outline"} onClick={() => id && submitDelete(id)}>
                                    Delete
                                </Button>
                                <Button>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
