import mongoose from "mongoose";
import BlinkPost, { BlinkPostDoc } from "../models/BlinkPost.model";
import { BlinkPostType } from "../interfaces/BlinkPost.interface";

/**
 * Create a new feature
 * @param args - Feature properties
 * @returns The created feature document
 */
export const createBlinkPost = async (data: {
  title: string;
  content: string;
  image: string;
  price: number;
  premiumTitle: string;
  premiumContent: string;
  premiumImage: string;
  type: BlinkPostType;
  revenue: number;
  creator: mongoose.Schema.Types.ObjectId;
  impressionCount: number;
  engagementCount: number;
  paymentCount: number;
}) => {
  const feature = new BlinkPost(data);
  return feature.save();
};


/**
 * Get all features
//  * @returns An array of all feature documents
//  */
// export const getAllFeatures = async (): Promise<FeatureDoc[]> => {
//   return Feature.find({}).sort({ createdAt: -1 });
// };

// /**
//  * Get feature by ID
//  * @param id - Feature ID
//  * @returns The feature document or null if not found
//  */
// export const getFeatureById = async (id: string): Promise<FeatureDoc | null> => {
//   return Feature.findById(id);
// };

// /**
//  * Get features by publisher
//  * @param publisher - Publisher name
//  * @returns An array of feature documents for the given publisher
//  */
// export const getFeaturesByPublisher = async (publisher: string): Promise<FeatureDoc[]> => {
//   return Feature.find({ publisher }).sort({ createdAt: -1 });
// };

// export const getFeaturesByProductId = async (productId: string): Promise<FeatureDoc[]> => {
//   return Feature.find({ productId }).sort({ createdAt: -1 });
// };

// /**
//  * Update feature status by ID
//  * @param id - Feature ID
//  * @param status - New implementation status
//  * @returns The updated feature document
//  */
// export const updateFeatureStatus = async (id: string, status: FeatureImplementationStatus): Promise<FeatureDoc | null> => {
//   return Feature.findByIdAndUpdate(id, { implementationStatus: status }, { new: true });
// };

// /**
//  * Add an upvote or downvote to a feature
//  * @param id - Feature ID
//  * @param isUpvote - Whether to add an upvote (true) or downvote (false)
//  * @param userId - The user ID to be added to the upvote/downvote list
//  * @returns The updated feature document
//  */
// export const addVoteToFeature = async (id: string, isUpvote: boolean, userId: string): Promise<FeatureDoc | null> => {
//   const feature = await Feature.findById(id);

//   if (!feature) {
//     throw new Error("Feature not found");
//   }

//   const reviewMetric = isUpvote ? feature.upvotes : feature.downvotes;

//   if (!reviewMetric.list.includes(userId)) {
//     reviewMetric.count += 1;
//     reviewMetric.list.push(userId);
//   }

//   return feature.save();
// };

// /**
//  * Update the usefulness metrics of a feature
//  * @param id - Feature ID
//  * @param feedback - 'yes', 'no', or 'maybe' feedback type
//  * @param userId - The user ID to be added to the feedback list
//  * @returns The updated feature document
//  */
// export const updateUsefulnessMetric = async (
//   id: string,
//   feedback: 'yes' | 'no' | 'maybe',
//   userId: string
// ): Promise<FeatureDoc | null> => {
//   const feature = await Feature.findById(id);

//   if (!feature) {
//     throw new Error("Feature not found");
//   }

//   const metric = feature.usefulness[feedback];

//   if (!metric.list.includes(userId)) {
//     metric.count += 1;
//     metric.list.push(userId);
//   }

//   return feature.save();
// };

// /**
//  * Delete a feature by ID
//  * @param id - Feature ID
//  * @returns The deleted feature document
//  */
// export const deleteFeature = async (id: string): Promise<FeatureDoc | null> => {
//   return Feature.findByIdAndDelete(id);
// };