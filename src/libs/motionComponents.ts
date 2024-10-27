import { Box, ChakraProps, Flex, FlexProps, Grid, GridProps, Image, ImageProps, MergeWithAs, Text, TextProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { DetailedHTMLProps, ForwardRefExoticComponent, HTMLAttributes, ImgHTMLAttributes } from "react";

export const MotionFlex = motion.create(
  Flex as ForwardRefExoticComponent<MergeWithAs<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, FlexProps>>
);

export const MotionImage = motion.create(
  Image as ForwardRefExoticComponent<MergeWithAs<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, any, ImageProps>>
);

export const MotionBox = motion.create(
  Box as ForwardRefExoticComponent<MergeWithAs<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, Omit<ChakraProps, never>>>
);

export const MotionText = motion.create(
  Text as ForwardRefExoticComponent<MergeWithAs<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, any, TextProps>>
);

export const MotionGrid = motion.create(
  Grid as ForwardRefExoticComponent<MergeWithAs<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, GridProps>>
);
