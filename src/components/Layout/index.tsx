import type { ReactNode } from "react"
import classes from "./Layout.module.css"

interface LayoutboxProps {
    children: ReactNode,
    title: string
}

export default function LayoutBox(props: LayoutboxProps){
    return <div className={classes["layout_box"]}>
        <h2>{props.title}</h2>
        <br />
        {props.children}
    </div>
}