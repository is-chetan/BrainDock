import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const ContentType = {
    Youtube: "youtube",
    X: "X"
} as const;

export type ContentType = (typeof ContentType)[keyof typeof ContentType];

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>(ContentType.Youtube);


    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (!title || !link) {
            alert("Please fill all fields.");
            return;
        }

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
    }

    if (!open) return null;

    return <div><div>
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60  flex justify-center">
        </div>
        <div>
            <div className="w-screen h-screen fixed left-0 top-0 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"} />
                            <Input reference={linkRef} placeholder={"Link"} />
                        </div>
                        <div>
                            <h1 className="pl-2">Type</h1>
                            <div className="flex gap-1 justify-center pb-2">
                                <Button
                                    text="Youtube"
                                    variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Youtube)}
                                />
                                <Button
                                    text="X"
                                    variant={type === ContentType.X ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.X)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={addContent} variant="primary" text="Submit" />
                        </div>
                    </span>
                </div>
            </div>

        </div>
    </div>
    </div>
}
