import { Button } from "@/components/ui/button";

export default function Buttons() {
  return (
    <div className="flex gap-3">
      <Button className="bg-blue text-yellow">Test</Button>
      <Button className="bg-yellow text-blue">Test</Button>
      <Button className="bg-fog text-blue">Test</Button>
      <Button className="bg-rose text-fog">Test</Button>
      <Button className="bg-green text-fog">Test</Button>
    </div>
  );
};
