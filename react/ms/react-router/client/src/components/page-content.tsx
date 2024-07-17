import { PropsWithChildren } from "react";
import classes from "./PageContent.module.css";

type PageContentProps = PropsWithChildren<{ title: string }>;

function PageContent({ title, children }: PageContentProps) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
