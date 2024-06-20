import { CarPage } from "@/pages/Car/Car";

interface Props {
  params: { id: string };
}

export default async function Page({ params: { id } }: Props) {
  return <CarPage id={id} />;
}
