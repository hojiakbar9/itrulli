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
      S.divider(),
      // Document lists
      S.documentTypeListItem("featuredFlavor").title("Featured Flavors"),

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
