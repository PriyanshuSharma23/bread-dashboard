export class FormType {
  constructor({
    id,
    createdAt,
    createdBy,
    formName,
    isVolunteer,
    start,
    updatedAt,
    isDraft,
  }) {
    this.id = id;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.formName = formName;
    this.isVolunteer = isVolunteer;
    this.start = start;
    this.updatedAt = updatedAt;
    this.isDraft = isDraft;
  }
}
