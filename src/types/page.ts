
import { ObjectId } from "./common";

export type PageParentType = "project" | "module" | "language" | "component" | "guide" | "root";
export type PageVisibility = "public" | "team" | "private";
export type RelationshipType = "documentation" | "implementation" | "reference" | "custom";
export type EntityType = "project" | "module" | "component" | "guide";

export interface PageRelatedEntity {
  type: EntityType;
  id: ObjectId;
  relationshipType: RelationshipType;
}

export interface PageParent {
  type: PageParentType;
  id: ObjectId | null; // null if at root
}

export interface PageMetadata {
  createdBy: ObjectId;
  createdAt: Date;
  lastUpdatedBy: ObjectId;
  lastUpdatedAt: Date;
  contributors: ObjectId[];
  version: number;
}

export interface PagePermissions {
  canEdit: string[]; // User IDs or role IDs
  canView: string[]; // User IDs or role IDs
}

export interface Page {
  _id: ObjectId;
  title: string;
  slug: string; // URL-friendly identifier
  content: string; // Rich markdown/HTML content
  parent: PageParent;
  relatedEntities: PageRelatedEntity[];
  metadata: PageMetadata;
  visibility: PageVisibility;
  tags: string[];
  permissions: PagePermissions;
}

export interface PageSummary {
  _id: ObjectId;
  title: string;
  slug: string;
  snippet?: string;
  matchScore?: number;
  parent: PageParent;
  metadata: {
    lastUpdatedBy: ObjectId;
    lastUpdatedAt: Date;
  };
  tags: string[];
}

export interface CreatePageRequest {
  title: string;
  content: string;
  parent: PageParent;
  relatedEntities?: PageRelatedEntity[];
  visibility: PageVisibility;
  tags?: string[];
}

export interface UpdatePageRequest {
  title?: string;
  content?: string;
  parent?: PageParent;
  relatedEntities?: PageRelatedEntity[];
  visibility?: PageVisibility;
  tags?: string[];
}

export interface LinkPageRequest {
  entityType: EntityType;
  entityId: ObjectId;
  relationshipType: RelationshipType;
}

export interface UnlinkPageRequest {
  entityType: EntityType;
  entityId: ObjectId;
}

export interface PageSearchParams {
  q?: string;
  tags?: string[];
  parent?: string; // Format: "type:id"
  limit?: number;
  page?: number;
}
