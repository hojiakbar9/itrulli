import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      // Singleton documents
      S.listItem()
        .title("Hero Banner")
        .id("hero")
        .child(S.document().schemaType("hero").documentId("hero")),
      S.listItem()
        .title("Our Story Page")
        .id("ourStory")
        .child(S.document().schemaType("ourStory").documentId("ourStory")),
      S.listItem()
        .title("Contact Page")
        .id("contactPage")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage")
        ),
      S.listItem()
        .title("Locations and Hours")
        .id("locations")
        .child(S.document().schemaType("locations").documentId("locations")),
      S.listItem()
        .title("Ice Lab Video Page")
        .id("iceLab")
        .child(S.document().schemaType("iceLab").documentId("iceLab")),
      S.divider(),
      // Document lists
      S.documentTypeListItem("job").title("Job Openings"),
      S.documentTypeListItem("galleryImage").title("Gallery Images"),
      S.documentTypeListItem("featuredFlavor").title("Featured Flavors"),

      S.divider(),
      // Menu group
      S.listItem()
        .title("Menu")
        .id("menu")
        .child(
          S.list()
            .title("Menu")
            .items([
              S.documentTypeListItem("menuItem").title("Menu Items"),
              S.documentTypeListItem("menuCategory").title("Categories"),
            ])
        ),
      S.divider(),
      // Blog group
      S.listItem()
        .title("Blog")
        .id("blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ])
        ),
    ]);
