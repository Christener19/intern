/////// THIS IS THE DASHBOARD/MAIN HOMEPAGE //////////
export default async function Index() {
  return (
    // adding redirects to either dashboard or login page depending on user status
    <section className="flex-1 w-full flex flex-col gap-20 items-center">
      <div>
        <h1>Hello World! Someone was here</h1>
      </div>
    </section>
  );
}
