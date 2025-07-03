"use client";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import handleErrorCode from "@/components/handle-error-code";
import Loading from "@/components/loading";
import Form from "@/components/admin/form/Form";
import Label from "@/components/admin/form/Label";
import Input from "@/components/admin/form/input/InputField";
import Link from "next/link";
import Button from "@/components/admin/ui/button/Button";
import { toast } from "@/hooks/use-toast";
import { Announcement } from "@/types/types_announcement";
import AnnouncementDelete from "./(server)/announcement_delete";
import AnnouncementGet from "./(server)/announcement_get";
import AnnouncementUpdate from "./(server)/announcement_update";
import AnnouncementCreate from "./(server)/announcement_create";
import AnnouncementImageUpload from "./(server)/announcement_image_upload";

export default function AdminSurveyPage() {
    const id = Number(useParams().id);
    const [announcement, setAnnouncement] = useState<Announcement | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        id != 0 ? fetchAnnouncement() : setLoading(false);
    }, [id]);

    const fetchAnnouncement = async () => {
        AnnouncementGet(id)
            .then((res) => {
                if (res.data) {
                    const announcementData = res.data as Announcement;
                    setAnnouncement(announcementData);
                    setLoading(false);
                    return;
                }
                console.error("Error fetching announcement:", res.error);
                setLoading(false);
                // @ts-ignore
                handleErrorCode(res.error.code ?? null);
            })
    }

    const updateAnnouncement = async () => {
        if (!announcement) {
            console.error("Announcement data is not available for update.");
            handleErrorCode("23503")
            return
        }

        const { data, error } = await AnnouncementUpdate(announcement);
        if (data) {
            toast({
                title: "Announcement updated successfully",
                description: "The announcement has been updated in the database.",
                variant: "success",
            })
            console.log("Announcement updated successfully:", data);
            setAnnouncement(data);
            return
        }
        console.error("Error updating announcement:", error);
        handleErrorCode(error?.code || null);
    }

    const createAnnouncement = async () => {
        if (!announcement) {
            console.error("Announcement data is not available for creation. Fill the form first.");
            toast({
                title: "Submission Error",
                description: "Please fill the form before creating a announcement.",
                variant: "destructive",
            })
            return
        }


        const { data, error } = await AnnouncementCreate(announcement);
        if (data) {
            toast({
                title: "Announcement created successfully",
                description: "The announcement has been created in the database.",
                variant: "success",
            })
            setAnnouncement(data);
            return
        }
        console.error("Error creating announcement:", error);
        handleErrorCode(error?.code || null);
    }

    const deleteAnnouncement = async () => {
        if (!confirm("Are you sure?"))
            return;

        const { data, error } = await AnnouncementDelete(id);

        if (data) {
            toast({
                variant: "default",
                description: "Success",
            });
            setAnnouncement(null);
            return
        }
        console.error(error);
        handleErrorCode(error.code);
    }

    const uploadAnnouncementImage = async (file: File | null) => {
        if (!file) {
            console.error("No file selected for upload.");
            toast({
                title: "Upload Image Error",
                description: "Please select an image to upload.",
                variant: "destructive",
            })
            return
        }

        const res = await AnnouncementImageUpload(file);

        if (res.error) {
            console.error("Error uploading image:", res.error);
            // @ts-ignore
            handleErrorCode(res.error.cause);
            return
        }

        // @ts-ignore
        setAnnouncement(prevSurvey => {
            return {
                ...prevSurvey,
                image_path: res.filepath
            }
        })
        toast({
            title: "Image uploaded successfully",
            description: "The image has been uploaded successfully.",
            variant: "success",
        })
    }

    const handleChangeEvent = (event: any) => handleChange(event.target.name, event.target.value);
    const handleChange = (key: string, value: any) => {
        // @ts-ignore
        setAnnouncement(prevSurvey => {
            return {
                ...prevSurvey,
                [key]: value
            }
        });

    }

    // Handle date formatting
    let date = announcement?.created_at;
    const spl = date?.split(":");
    if (spl) date = spl[0] + ":" + spl[1];


    if (loading) {
        return <Loading />
    }

    return (
        <div className={"flex justify-center"}>
            <div className={"w-[75%] align-middle"}>
                <Form onSubmit={() => { }}>
                    <div className={"flex flex-col gap-2"}>
                        <Label htmlFor={"id"}>Id</Label>
                        <Input disabled={true} name={"id"} defaultValue={announcement?.id} />

                        <Label htmlFor={"title"}>Title (text)</Label>
                        <Input type={"text"} name={"title"} onChange={handleChangeEvent} defaultValue={announcement?.title} />

                        <Label htmlFor={"icon"}>Event Id</Label>
                        <div className="relative flex items-center">
                            <Input type={"number"} name={"icon"} onChange={handleChangeEvent} defaultValue={announcement?.event_id} placeholder={"Icon"} />
                        </div>
                        <Label htmlFor={"description"}>Description (text)</Label>
                        <Input type={"text"} name={"description"} onChange={handleChangeEvent} defaultValue={announcement?.description} placeholder={"Description"} />

                        <div className="flex flex-row gap-4">
                            <Label htmlFor={"image-path"}>Image Path (e.g image.png)</Label>
                            <input type="file" accept="image/*"
                                name="image_path"
                                onChange={e => uploadAnnouncementImage(e.target.files?.[0] ?? null)}
                                className="cursor-pointer file:cursor-pointer file:rounded-md file:border-0
                                file:bg-bite-tongue file:px-4 file:py-2 file:text-sm file:font-semibold
                                file:text-background hover:file:bg-copper-coin transition-colors duration-200
                                text-transparent"
                            />
                        </div>
                        <input type={"text"} name={"image_path"} placeholder="No files found" onChange={handleChangeEvent} value={announcement?.image_path || "/images/yazilim.png"} />

                        <Label htmlFor={"created-at"}>Created At</Label>
                        <Input disabled name={"created_at"} onChange={handleChangeEvent} defaultValue={announcement?.created_at} />


                        <div className={"flex w-[100%]"}>
                            <div className={"gap-2 flex items-center"}>
                                <Link href={"/admin/announcement"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Back
                                    </Button>
                                </Link>
                                {id != 0 && <Link href={"/admin/announcement/0"}>
                                    <Button variant={"outline"} className="cursor-pointer">
                                        Create
                                    </Button>
                                </Link>}
                            </div>
                            <div className={"gap-2 flex justify-end w-[100%]"}>
                                <Button variant={"outline"} className="cursor-pointer" onClick={() => id && deleteAnnouncement()}>
                                    Delete
                                </Button>
                                <Button className="cursor-pointer" onClick={() => id ? updateAnnouncement() : createAnnouncement()}>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div >
        </div >
    )
}
