import pcloud from "../../pcloud.app.mjs";

module.exports = {
  key: "pcloud-copy-file",
  name: "Copy File",
  description:
    "Copy a file to the specified destination.",
  version: "0.0.1",
  type: "action",
  props: {
    pcloud,
    fileId: {
      type: "integer",
      label: "File ID",
      description: "ID of the file to copy.",
      async options() {
        return await this.pcloud.getFileOptions();
      },
    },
    toFolderId: {
      propDefinition: [
        pcloud,
        "toFolderId",
      ],
    },
    name: {
      propDefinition: [
        pcloud,
        "name",
      ],
      label: "To Name",
      description: "Name of the destination file.",
    },
    overwrite: {
      propDefinition: [
        pcloud,
        "overwrite",
      ],
    },
    modifiedTime: {
      type: "integer",
      label: "Modified Time",
      description: "Must be Unix time (seconds).",
      optional: true,
    },
    createdTime: {
      type: "integer",
      label: "Created Time",
      description: `Must be Unix time (seconds).
      \\
      Requires \`Modified Time\` to be set.`,
      optional: true,
    },
  },
  async run() {
    return await this.pcloud._withRetries(
      () => this.pcloud.copyFile(this.fileId,
        this.toFolderId,
        this.name,
        !this.overwrite,
        this.modifiedTime,
        this.createdTime),
    );
  },
};
